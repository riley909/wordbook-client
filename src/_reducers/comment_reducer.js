import { CREATE_COMMENTS, GET_COMMENTS } from '../_actions/types';

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
    case `${CREATE_COMMENTS}_SUCCESS`:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          total: state.data.total + 1,
          currentPage: 1,
          data: [
            action.payload.comment,
            ...state.data.data.slice(0, state.data.data.length - 1),
          ],
        },
      };
    case `${CREATE_COMMENTS}_FAILURE`:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
}
