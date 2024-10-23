import axios from "axios";

const apiInstance = axios.create({
  baseURL: "http://localhost:4444/api",
});

export default apiInstance;
