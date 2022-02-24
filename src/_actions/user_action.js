import axios from 'axios';
import { LOGIN_USER } from './types';

export function loginUser(dataToSubmit) {
  const request = axios
    .post('http://localhost:4000/auth/signin', dataToSubmit)
    .then((res) => res.data);

  return {
    type: LOGIN_USER,
    payload: request,
  };
}
