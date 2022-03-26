import { CREATE_FOLDER, GET_FOLDER_WORDS, GET_FOLDER_LIST } from './types';
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

export const getFolderList = () => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch({ type: `${GET_FOLDER_LIST}` });
    dispatch({ type: `${GET_FOLDER_LIST}_LOADING`, payload: isLoading });

    try {
      const res = await api.getFolderList();
      dispatch({ type: `${GET_FOLDER_LIST}_SUCCESS`, payload: res.data });
      isLoading = false;
      dispatch({ type: `${GET_FOLDER_LIST}_LOADING`, payload: isLoading });
      return res.data;
    } catch (error) {
      dispatch({ type: `${GET_FOLDER_LIST}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${GET_FOLDER_LIST}_LOADING`, payload: isLoading });
    }
  };
};

export const getFolderWords = (info, words) => {
  return async (dispatch) => {
    dispatch({ type: `${GET_FOLDER_WORDS}` });

    try {
      dispatch({ type: `${GET_FOLDER_WORDS}_SUCCESS`, payload: { info, words } });
    } catch (error) {
      dispatch({ type: `${GET_FOLDER_WORDS}_FAILURE`, payload: error });
    }
  };
};
