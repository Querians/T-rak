import axios from 'axios';

const axfetch = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export default axfetch;
