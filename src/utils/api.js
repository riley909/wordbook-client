import axios from 'axios';

const baseUrl = `http://localhost:4000`;

export const login = async (data) =>
  await axios.post(`${baseUrl}/auth/signin`, data, { withCredentials: true });
export const signup = async (data) => await axios.post(`${baseUrl}/auth/signup`, data);
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

export const createFolder = async (data, token) =>
  await axios.post(`${baseUrl}/folders`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
