import { GET_COMMENTS } from './types';
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