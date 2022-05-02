import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './_reducers/index';
import { loadToken } from './utils/api';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const token = loadToken();

const store = createStore(
  rootReducer,
  {
    user: { auth: { token, loading: false, error: null } },
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
