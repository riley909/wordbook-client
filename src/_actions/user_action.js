import { LOGIN } from './types';
import * as api from '../utils/api';

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
