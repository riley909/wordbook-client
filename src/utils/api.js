import axios from 'axios';

const baseUrl = `http://localhost:4000`;

export const login = async (userInfo) =>
  await axios.post(`${baseUrl}/auth/signin`, userInfo);
