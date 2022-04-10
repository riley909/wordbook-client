import { CREATE_STUDYLOG, GET_STUDYLOGS } from '../_actions/types';

export const studyLogState = {
  loading: false,
  error: null,
  data: null,
};

export default function (state = studyLogState, action) {
  switch (action.type) {
    case `${GET_STUDYLOGS}_LOADING`:
      return {
        ...state,
        loading: action.payload,
      };
    case `${GET_STUDYLOGS}_SUCCESS`:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };
    case `${GET_STUDYLOGS}_FAILURE`:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case `${CREATE_STUDYLOG}_LOADING`:
      return {
        ...state,
        loading: action.payload,
      };
    case `${CREATE_STUDYLOG}_SUCCESS`:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          total: state.data.total + 1,
          currentPage: 1,
          data: [action.payload.studyLog, ...state.data.data],
        },
      };
    case `${CREATE_STUDYLOG}_FAILURE`:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
}
