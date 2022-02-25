import { LOGIN } from './types';
import * as api from '../utils/api';

export const login = (data) => async (dispatch) => {
  dispatch({ type: LOGIN });
  try {
    const res = await api.login(data);
    dispatch({ type: `${LOGIN}_SUCCESS`, payload: res.data });
    return res.data;
  } catch (error) {
    dispatch({ type: `${LOGIN}_FAILURE`, payload: error });
  }
};
