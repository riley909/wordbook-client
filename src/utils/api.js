import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = `http://localhost:4000`;
const cookie = new Cookies();

export const loadToken = () => {
  const token = cookie.get('Authorization') || null;
  return token;
};

const withCredentials = {
  withCredentials: true,
};

export const removeToken = () => cookie.remove('Authorization');

export const login = async (data) => {
  const result = await axios.post(`${baseUrl}/auth/signin`, data, withCredentials);
  return result;
};

export const signup = async (data) => await axios.post(`${baseUrl}/auth/signup`, data);

export const getProfile = async () => {
  return await axios.get(`${baseUrl}/auth/profile`, withCredentials);
};

export const getEmail = async (email) =>
  await axios.get(`${baseUrl}/auth/email/${email}`);

export const getQuery = (q, start = 1, num = 10, part = 'word', sort = 'dict') => {
  return { q, start, num, part, sort };
};
export const search = async (query) =>
  await axios.get(
    `${baseUrl}/search?q=${query.q}&start=${query.start}&num=${query.num}&part=${query.part}&sort=${query.sort}`
  );
export const searchView = async (query) =>
  await axios.get(`${baseUrl}/searchView?target_code=${query}`);

export const createFolder = async (data) => {
  return await axios.post(`${baseUrl}/folders`, data, withCredentials);
};
