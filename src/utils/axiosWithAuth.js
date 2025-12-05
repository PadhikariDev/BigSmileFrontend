// src/utils/axiosWithAuth.js
import axios from "axios";

const API = import.meta.env.VITE_BACKEND_URL;

const axiosWithAuth = axios.create({
    baseURL: API,
});

// Add token automatically to headers
axiosWithAuth.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosWithAuth;
