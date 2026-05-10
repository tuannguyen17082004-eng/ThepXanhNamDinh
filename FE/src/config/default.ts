import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BE_PORT,
    withCredentials: true
});

export default api;

