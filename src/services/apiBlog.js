import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:4444/api",
});

export const setAuthHeader = (token) => {
  if (token) {
    apiInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    apiInstance.defaults.headers.common["Authorization"] = "";
  }
};

export default apiInstance;
