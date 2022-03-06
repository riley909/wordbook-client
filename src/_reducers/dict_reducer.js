import { DICT_SEARCH } from '../_actions/types';

export const dictState = {
  search: {
    loading: false,
    error: null,
    data: null,
  },
};
export default function (state = dictState, action) {
  switch (action.type) {
    case `${DICT_SEARCH}_LOADING`:
      return {
        ...state,
        search: {
          loading: action.payload,
          ...state.search,
        },
      };
    case `${DICT_SEARCH}_SUCCESS`:
      return {
        ...state,
        search: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case `${DICT_SEARCH}_FAILURE`:
      return {
        ...state,
        search: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };

    default:
      return state;
  }
}
