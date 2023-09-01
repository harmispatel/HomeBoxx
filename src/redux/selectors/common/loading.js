import get from 'lodash/get';

export const createLoadingSelector = (actions) => (state) => actions
  .some((action) => {
    if (!action.includes('_REQUEST')) return false;
    const normalized = action.replace('_REQUEST', '');
    return get(state, `COMMON.loading.${normalized}`);
  });
