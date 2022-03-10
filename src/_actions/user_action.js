import { LOGIN, LOGOUT, SIGNUP } from './types';
import * as api from '../utils/api';
import Cookies from 'universal-cookie';

export const login = (data) => {
  let isLoading = true;

  return async (dispatch) => {
    dispatch({ type: LOGIN });
    dispatch({ type: `${LOGIN}_LOADING`, payload: isLoading });
    try {
      const res = await api.login(data);
      dispatch({ type: `${LOGIN}_SUCCESS`, payload: res.data });
      isLoading = false;
      dispatch({ type: `${LOGIN}_LOADING`, payload: isLoading });
      return res.data;
    } catch (error) {
      dispatch({ type: `${LOGIN}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${LOGIN}_LOADING`, payload: isLoading });
    }
  };
};

export const signup = (data) => {
  return async (dispatch) => {
    dispatch({ type: SIGNUP });

    try {
      const res = await api.signup(data);
      dispatch({ type: `${SIGNUP}_SUCCESS`, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({ type: `${SIGNUP}_FAILURE`, payload: error });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({ type: LOGOUT });
    const cookie = new Cookies();
    cookie.remove('Authorization');
    dispatch({ type: `${LOGOUT}_SUCCESS`, payload: null });
  };
};
