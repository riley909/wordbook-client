import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'universal-cookie';
import rootReducer from './_reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cookie = new Cookies();
const token = cookie.get('Authorization') || null;

const store = createStore(
  rootReducer,
  {
    user: { auth: { token, loading: false, error: null } },
  },
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
