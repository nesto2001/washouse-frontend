import { BASE_URL } from '../../common/Constant';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 15000,
    headers: {
        Accept: 'application/json',
    },
});

// Add a response interceptor
instance.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    async function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        const originalRequest = error.config;
        if (error?.response?.status === 401) {
            //Handle refresh token
        }

        return Promise.reject(error);
    },
);

// Hàm để refresh token
const refreshToken = async () => {};

export default instance;
