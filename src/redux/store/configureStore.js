import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistCombineReducers } from 'redux-persist';
import reducers from 'reducers';
import sagas from 'sagas';
import axios from 'axios';
import Selectors from 'selectors';
import Actions from 'actions';
import auth from 'utils/auth';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

let middlewares;
let store;
const sagaMiddleware = createSagaMiddleware();

const config = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['PERSIST'],
};

const reducer = persistCombineReducers(config, reducers);

/* global __DEV__ */
if (__DEV__) {
  const excludedActions = [
    // 'persist/REHYDRATE',
  ];
  const logger = createLogger({
    collapsed: true,
    predicate: (getState, action) => excludedActions.indexOf(action.type) < 0,
  });
  middlewares = applyMiddleware(sagaMiddleware, logger);
} else {
  middlewares = applyMiddleware(sagaMiddleware);
}

export const getStore = () => store;

const configureInterceptor = () => {
  axios.interceptors.request.use(async (req) => {
    if (!Selectors.isNetworkConnected(store.getState())) {
      throw new Error('Please check your internet connection or try again later');
    }
    const defaultConfig = req;
    let token = Selectors.getAccessToken(store.getState());
    if (token !== null) {
      const expiresIn = Selectors.getTokenExpiry(store.getState());
      const issuedTime = Selectors.getIssuedTime(store.getState());
      if (moment().isSameOrAfter(moment(issuedTime).add(expiresIn, 'seconds'))) {
        const refreshToken = Selectors.getRefreshToken(store.getState());
        const auth0 = await auth.refreshToken(refreshToken);
        if (auth0?.accessToken) {
          const { accessToken, expiresIn: newExpiry } = auth0;
          const now = moment().format();
          store.dispatch(Actions.setToken({
            accessToken,
            refreshToken,
            expiresIn: newExpiry,
            issuedTime: now,
          }));
          token = accessToken;
        }
      }
      defaultConfig.headers.Authorization = `Bearer ${token}`;
      return defaultConfig;
    }
    return defaultConfig;
  }, (error) => Promise.reject(error));

  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response) {
      return Promise.reject(error.response);
    }
    return Promise.reject(new Error('Please check your internet connection or try again later'));
  });
};


const configureStore = () => {
  store = createStore(reducer, middlewares);
  sagaMiddleware.run(sagas);
  configureInterceptor();
  const persistor = persistStore(store);

  return { persistor, store };
};

export default configureStore;
