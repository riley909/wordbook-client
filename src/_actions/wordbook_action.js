import { CREATE_FOLDER } from './types';
import * as api from '../utils/api';

export const createFolder = (data, token) => {
  return async (dispatch) => {
    dispatch({ type: `${CREATE_FOLDER}` });

    try {
      const res = api.createFolder(data, token);
      dispatch({ type: `${CREATE_FOLDER}_SUCCESS`, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({ type: `${CREATE_FOLDER}_FAILURE`, payload: error });
    }
  };
};
