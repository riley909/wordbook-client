import { CREATE_FOLDER, GET_FOLDER_LIST } from '../_actions/types';

export const wordbookState = {
  folder: {
    create: { error: null, data: null },
    read: { loading: false, error: null, data: null },
  },
};
export default function (state = wordbookState, action) {
  switch (action.type) {
    case `${CREATE_FOLDER}_SUCCESS`:
      return {
        ...state,
        folder: { create: { error: null, data: action.payload } },
      };
    case `${CREATE_FOLDER}_FAILURE`:
      return {
        ...state,
        folder: { create: { error: action.payload, data: null } },
      };
    case `${GET_FOLDER_LIST}_LOADING`:
      return {
        ...state,
        folder: {
          read: {
            ...state.folder.read,
            loading: action.payload,
          },
        },
      };
    case `${GET_FOLDER_LIST}_SUCCESS`:
      return {
        ...state,
        folder: {
          read: {
            loading: false,
            error: null,
            data: action.payload,
          },
        },
      };
    case `${GET_FOLDER_LIST}_FAILURE`:
      return {
        ...state,
        folder: {
          read: {
            loading: false,
            error: action.payload,
            data: null,
          },
        },
      };

    default:
      return state;
  }
}
