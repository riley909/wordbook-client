import Cookies from 'universal-cookie';

const cookie = new Cookies();
const token = cookie.get('Authorization') || null;

export const initialState = {
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
