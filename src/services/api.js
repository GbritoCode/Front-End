import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:51314",
});

export default api;
