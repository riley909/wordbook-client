import { GET_PROFILE, LOGIN, LOGOUT, SIGNUP } from '../_actions/types';

export const userState = {
  auth: {
    loading: false,
    error: null,
    token: null,
  },
  profile: {
    error: null,
    data: null,
  },
  signup: {
    loading: false,
    error: null,
    data: null,
  },
};

export default function (state = userState, action) {
  switch (action.type) {
    case `${LOGIN}_LOADING`:
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: action.payload,
          error: null,
        },
      };
    case `${LOGIN}_SUCCESS`:
      return {
        ...state,
        auth: {
          loading: false,
          token: action.payload,
          error: null,
        },
      };
    case `${LOGIN}_FAILURE`:
      return {
        ...state,
        auth: { loading: false, token: null, error: action.payload },
      };
    case `${GET_PROFILE}_SUCCESS`:
      return {
        ...state,
        profile: { error: null, data: action.payload },
      };
    case `${GET_PROFILE}_FAILURE`:
      return {
        ...state,
        profile: { error: action.payload, data: null },
      };
    case `${SIGNUP}_SUCCESS`:
      return {
        ...state,
        signup: { error: null, data: action.payload },
      };
    case `${SIGNUP}_FAILURE`:
      return {
        ...state,
        signup: { error: action.payload, data: null },
      };
    case `${LOGOUT}_SUCCESS`:
      return {
        ...state,
        auth: {
          loading: false,
          error: null,
          token: action.payload,
        },
        profile: {
          error: null,
          data: '',
        },
      };
    default:
      return state;
  }
}
