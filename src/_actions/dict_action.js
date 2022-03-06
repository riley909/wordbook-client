import { DICT_SEARCH } from './types';
import * as api from '../utils/api';

export const search = (query) => {
  let isLoading = true;

  return async (dispatch) => {
    dispatch({ type: DICT_SEARCH });
    dispatch({ type: `${DICT_SEARCH}_LOADING`, payload: isLoading });

    try {
      const res = await api.search(query);
      dispatch({ type: `${DICT_SEARCH}_SUCCESS`, payload: res.data });
      isLoading = false;
      dispatch({ type: `${DICT_SEARCH}_LOADING`, payload: isLoading });
      return res.data;
    } catch (error) {
      dispatch({ type: `${DICT_SEARCH}_FAILURE`, payload: error });
      isLoading = false;
      dispatch({ type: `${DICT_SEARCH}_LOADING`, payload: isLoading });
    }
  };
};
