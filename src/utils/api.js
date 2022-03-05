import axios from 'axios';

const baseUrl = `http://localhost:4000`;

export const login = async (data) =>
  await axios.post(`${baseUrl}/auth/signin`, data, { withCredentials: true });
export const signup = async (data) => await axios.post(`${baseUrl}/auth/signup`, data);
export const getEmail = async (email) =>
  await axios.get(`${baseUrl}/auth/email/${email}`);
