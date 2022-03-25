import { CREATE_FOLDER, GET_FOLDER_WORDS, GET_FOLDER_LIST } from '../_actions/types';

export const wordbookState = {
  folder: {
    loading: false,
    error: null,
    data: null,
  },
};
export default function (state = wordbookState, action) {
  switch (action.type) {
    case `${CREATE_FOLDER}_SUCCESS`:
      return {
        ...state,
        folder: {
          loading: false,
          error: null,
          data: state.folder.data.concat(action.payload),
        },
      };
    case `${CREATE_FOLDER}_FAILURE`:
      return {
        ...state,
        folder: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${GET_FOLDER_LIST}_LOADING`:
      return {
        ...state,
        folder: {
          ...state.folder,
          loading: action.payload,
        },
      };
    case `${GET_FOLDER_LIST}_SUCCESS`:
      return {
        ...state,
        folder: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case `${GET_FOLDER_LIST}_FAILURE`:
      return {
        ...state,
        folder: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };
    case `${GET_FOLDER_WORDS}_SUCCESS`:
      return {
        ...state,
        folder: {
          loading: false,
          error: null,
          data: action.payload,
        },
      };
    case `${GET_FOLDER_WORDS}_FAILURE`:
      return {
        ...state,
        folder: {
          loading: false,
          error: action.payload,
          data: null,
        },
      };

    default:
      return state;
  }
}
