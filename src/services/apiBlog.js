import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:4444/api",
});

apiInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiInstance;
