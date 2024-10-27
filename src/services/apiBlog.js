import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:4444/api",
});

export const setAuthHeader = (token) => {
  apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default apiInstance;
