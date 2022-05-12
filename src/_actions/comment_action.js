import { CREATE_COMMENTS, DELETE_COMMENTS, GET_COMMENTS } from './types';
import * as api from '../utils/api';

export const getComments = (studyLogId, limit, offset) => {
  let isLoading = true;
  return async (dispatch) => {
    dispatch({ type: `${GET_COMMENTS}` });
    dispatch({ type: `${GET_COMMENTS}_LOADING`, payload: isLoading });

    try {
      const res = await api.getComments(studyLogId, limit, offset);
      dispatch({ type: `${GET_COMMENTS}_SUCCESS`, payload: res.data });
      isLoading = false;
      dispatch({ type: `${GET_COMMENTS}_LOADING`, payload: isLoading });
    } catch (error) {
      dispatch({ type: `${GET_COMMENTS}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${GET_COMMENTS}_LOADING`, payload: isLoading });
    }
  };
};

export const createComment = (data) => {
  return async (dispatch) => {
    dispatch({ type: `${CREATE_COMMENTS}` });

    try {
      const res = await api.createComment(data);
      dispatch({ type: `${CREATE_COMMENTS}_SUCCESS`, payload: res.data });
    } catch (error) {
      dispatch({ type: `${CREATE_COMMENTS}_FAILURE`, payload: error });
    }
  };
};

export const deleteComment = (id) => {
  return async (dispatch) => {
    dispatch({ type: `${DELETE_COMMENTS}` });

    try {
      const res = await api.deleteComment(id);
      dispatch({ type: `${DELETE_COMMENTS}_SUCCESS`, payload: id });
    } catch (error) {
      dispatch({ type: `${DELETE_COMMENTS}_FAILURE`, payload: error });
    }
  };
};
