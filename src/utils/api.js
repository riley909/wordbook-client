import axios from 'axios';
import Cookies from 'universal-cookie';

const baseUrl = `http://localhost:4000`;
const cookie = new Cookies();

// TOKEN
export const loadToken = () => {
  const token = cookie.get('Authorization') || null;
  return token;
};
export const removeToken = () => cookie.remove('Authorization');

// AXIOS OPTION
const withCredentials = {
  withCredentials: true,
};

// USER API
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

// DICTIONARY API
export const getQuery = (q, start = 1, num = 10, part = 'word', sort = 'dict') => {
  return { q, start, num, part, sort };
};
export const search = async (query) =>
  await axios.get(
    `${baseUrl}/search?q=${query.q}&start=${query.start}&num=${query.num}&part=${query.part}&sort=${query.sort}`
  );
export const searchView = async (query) =>
  await axios.get(`${baseUrl}/searchView?target_code=${query}`);

// FOLDER API
export const createFolder = async (data) => {
  return await axios.post(`${baseUrl}/folders`, data, withCredentials);
};
export const getFolderList = async () =>
  await axios.get(`${baseUrl}/folders`, withCredentials);
export const getFolder = async (id) =>
  await axios.get(`${baseUrl}/folders/${id}`, withCredentials);

// WORD API
export const createWord = async (data) =>
  await axios.post(`${baseUrl}/words`, data, withCredentials);
export const getWords = async (id, sort, limit, offset) =>
  await axios.get(
    `${baseUrl}/words?folderId=${id}&sort=${sort}&limit=${limit}&offset=${offset}`,
    withCredentials
  );
export const updateWordStatus = async (id) =>
  await axios.patch(`${baseUrl}/words/${id}`, null, withCredentials);
export const deleteWord = async (id) =>
  await axios.delete(`${baseUrl}/words/${id}`, withCredentials);
