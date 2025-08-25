import axios from 'axios';

// Hardcoded production backend URL (per user request)
const backend = 'https://url-wheat-iota.vercel.app';

const api = axios.create({
  baseURL: backend,
  withCredentials: true,
});

export default api;
