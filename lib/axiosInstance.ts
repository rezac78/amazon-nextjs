// src/lib/axiosInstance.ts
import axios from "axios";

const isServer = typeof window === "undefined";

const axiosInstance = axios.create({
 baseURL: isServer ? "https://back-api.eleqra.ir/graphql" : "/api/proxy/graphql",
 headers: {
  "Content-Type": "application/json",
 },
});

axiosInstance.interceptors.request.use((config) => {
 const token = "YOUR_TOKEN_HERE";
 if (token) {
  config.headers.Authorization = `Bearer ${token}`;
 }
 return config;
});

export default axiosInstance;
