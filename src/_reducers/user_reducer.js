import { initialState } from './initialState';

export default function (state = initialState, action) {
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
    default:
      return state;
  }
}
