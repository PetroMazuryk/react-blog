import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:4444/api",
});

// apiInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export const setAuthHeader = (token) => {
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default apiInstance;
