import {
  CREATE_STUDYLOG,
  DELETE_STUDYLOG,
  GET_STUDYLOGS,
  UPDATE_STUDYLOG,
} from '../_actions/types';

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
    case `${DELETE_STUDYLOG}_LOADING`:
      return {
        ...state,
        loading: action.payload,
      };
    case `${DELETE_STUDYLOG}_SUCCESS`:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          total: state.data.total - 1,
          currentPage: 1,
          data: state.data.data.filter((val) => val.id !== action.payload),
        },
      };
    case `${DELETE_STUDYLOG}_FAILURE`:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };
    case `${UPDATE_STUDYLOG}_LOADING`:
      return {
        ...state,
        loading: action.payload,
      };
    case `${UPDATE_STUDYLOG}_SUCCESS`:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          currentPage: 1,
          data: state.data.data.map((val) =>
            val.id === action.payload.studyLog.id ? action.payload.studyLog : val
          ),
        },
      };
    case `${UPDATE_STUDYLOG}_FAILURE`:
      return {
        loading: false,
        error: action.payload,
        data: null,
      };

    default:
      return state;
  }
}
