import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promiseMiddleWare from 'redux-promise';
import rootReducer from './_reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, promiseMiddleWare))
);

export default store;
