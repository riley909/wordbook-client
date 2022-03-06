import { SIGNUP } from '../_actions/types';

export const userState = {
  auth: {
    loading: false,
    error: null,
    token: token,
  },
  signup: {
    loading: false,
    error: null,
    data: null,
  },
};

export default function (state = userState, action) {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return {
        ...state,
        auth: {
          ...state.auth,
          loading: action.payload,
          error: null,
        },
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          loading: false,
          token: action.payload,
          error: null,
        },
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        auth: { loading: false, token: null, error: action.payload },
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
    default:
      return state;
  }
}
