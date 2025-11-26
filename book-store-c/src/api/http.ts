import axios, { AxiosRequestConfig } from "axios";

// 모든 요청에 Base로 들어가는 url
const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true,
        ...config,
    });

    // 에러에 대한 인터셉트
    axiosInstance.interceptors.response.use((response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    });

    return axiosInstance;
}

export const httpClient = createClient();