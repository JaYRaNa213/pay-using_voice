import axios from "axios";

const API_BASE = "https://your-backend.example.com/api";

export const api = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// attach token in interceptors (example)
api.interceptors.request.use(async config => {
  // read token from secure storage
  // const token = await EncryptedStorage.getItem("token");
  // if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
