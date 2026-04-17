import axios from "axios";

const api = axios.create({
    //baseURL: 'http://10.178.204.108:3000/api',
    baseURL: 'http://192.168.0.103:3000/api',
    //baseURL: 'http://192.168.2.193:3000/api',
    //baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
    "Content-Type": "application/json",
    },
});

export default api;

