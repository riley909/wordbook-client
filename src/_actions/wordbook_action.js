import { CREATE_FOLDER } from './types';
import * as api from '../utils/api';

export const createFolder = (data) => {
  return async (dispatch) => {
    dispatch({ type: `${CREATE_FOLDER}` });

    try {
      const res = await api.createFolder(data);
      dispatch({ type: `${CREATE_FOLDER}_SUCCESS`, payload: res.data });
      return res.data;
    } catch (error) {
      dispatch({ type: `${CREATE_FOLDER}_FAILURE`, payload: error });
    }
  };
};
