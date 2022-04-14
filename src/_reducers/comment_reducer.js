import { GET_COMMENTS } from '../_actions/types';

const commentState = {
  loading: false,
  error: null,
  data: null,
};

export default function (state = commentState, action) {
  switch (action.type) {
    case `${GET_COMMENTS}_LOADING`:
      return {
        ...state,
        loading: action.payload,
      };
    case `${GET_COMMENTS}_SUCCESS`:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case `${GET_COMMENTS}_FAILURE`:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
}
