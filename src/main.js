import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configureStore';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App';

const { persistor, store } = configureStore();

const Main = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

export default Main;
