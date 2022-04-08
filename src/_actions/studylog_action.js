import { GET_STUDYLOGS } from './types';
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
