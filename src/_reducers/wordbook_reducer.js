import { CREATE_FOLDER } from '../_actions/types';

export const wordbookState = {
  folder: {
    create: { error: null, data: null },
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

    default:
      return state;
  }
}
