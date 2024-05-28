import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:57192/api",
});

export default api;
