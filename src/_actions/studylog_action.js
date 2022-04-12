import {
  CREATE_STUDYLOG,
  DELETE_STUDYLOG,
  GET_STUDYLOGS,
  UPDATE_STUDYLOG,
} from './types';
import * as api from '../utils/api';

export const getStudyLogs = (search, date, limit, offset) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch({ type: `${GET_STUDYLOGS}` });
    dispatch({ type: `${GET_STUDYLOGS}_LOADING`, payload: isLoading });

    try {
      const res = await api.getStudyLogs(search, date, limit, offset);
      dispatch({ type: `${GET_STUDYLOGS}_SUCCESS`, payload: res.data });
      isLoading = false;
      dispatch({ type: `${GET_STUDYLOGS}_LOADING`, payload: isLoading });
    } catch (error) {
      dispatch({ type: `${GET_STUDYLOGS}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${GET_STUDYLOGS}_LOADING`, payload: isLoading });
    }
  };
};

export const createStudyLog = (data) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch({ type: `${CREATE_STUDYLOG}` });
    dispatch({ type: `${CREATE_STUDYLOG}_LOADING`, payload: isLoading });

    try {
      const res = await api.createStudyLog(data);
      dispatch({ type: `${CREATE_STUDYLOG}_SUCCESS`, payload: res.data });
      isLoading = false;
      dispatch({ type: `${CREATE_STUDYLOG}_LOADING`, payload: isLoading });
    } catch (error) {
      dispatch({ type: `${CREATE_STUDYLOG}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${CREATE_STUDYLOG}_LOADING`, payload: isLoading });
    }
  };
};

export const deleteStudyLog = (id) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch({ type: `${DELETE_STUDYLOG}` });
    dispatch({ type: `${DELETE_STUDYLOG}_LOADING`, payload: isLoading });

    try {
      await api.deleteStudyLog(id);
      dispatch({ type: `${DELETE_STUDYLOG}_SUCCESS`, payload: id });
      isLoading = false;
      dispatch({ type: `${DELETE_STUDYLOG}_LOADING`, payload: isLoading });
    } catch (error) {
      dispatch({ type: `${DELETE_STUDYLOG}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${DELETE_STUDYLOG}_LOADING`, payload: isLoading });
    }
  };
};

export const updateStudyLog = (id, data) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch({ type: `${UPDATE_STUDYLOG}` });
    dispatch({ type: `${UPDATE_STUDYLOG}_LOADING`, payload: isLoading });

    try {
      const res = await api.updateStudyLog(id, data);
      dispatch({ type: `${UPDATE_STUDYLOG}_SUCCESS`, payload: res.data });
      isLoading = false;
      dispatch({ type: `${UPDATE_STUDYLOG}_LOADING`, payload: isLoading });
    } catch (error) {
      dispatch({ type: `${UPDATE_STUDYLOG}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${UPDATE_STUDYLOG}_LOADING`, payload: isLoading });
    }
  };
};
