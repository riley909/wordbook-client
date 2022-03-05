import Cookies from 'universal-cookie';

const cookie = new Cookies();
let token = null;
if (cookie.get('Authorization')) {
  token = cookie.get('Authorization');
}

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
