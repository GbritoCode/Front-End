import axios from "axios";

const api = axios.create({
  baseURL: "api.tovoit.com.br"
});

export default api;
