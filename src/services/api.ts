import axios from "axios";

const api = axios.create({
  baseURL: "https://myfinance.fly.dev/api",
});

export default api;
