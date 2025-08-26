import axios from 'axios';

// Hardcoded production backend URL (per user request)
const backend = 'https://url-wheat-iota.vercel.app';

// Export the backend base URL so UI can construct full short URLs reliably.
export const BACKEND = backend;

const api = axios.create({
  baseURL: backend,
  withCredentials: true,
});

export default api;
