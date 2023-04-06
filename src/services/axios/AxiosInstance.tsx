import { BASE_URL } from '../../common/Constant';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { refresh } from '../../repositories/AuthRepository';

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
        if (error?.response?.status === 401 || error?.response?.status === 403) {
            if (!originalRequest?.retry) {
                originalRequest.retry = true;
                const fetchData = async () => {
                    return await refresh({
                        refreshToken: localStorage.getItem('refreshToken') ?? '',
                        accessToken: localStorage.getItem('accessToken') ?? '',
                    });
                };
                fetchData().then((res) => {
                    console.log(res);
                    setAuthToken(res.data.data.accessToken as string);
                    originalRequest.headers['Authorization'] = 'Bearer ' + res.data.data.accessToken;

                    localStorage.setItem('refreshToken', res.data.data.refreshToken);
                    localStorage.setItem('accessToken', res.data.data.accessToken);

                    return instance(originalRequest);
                });
            } else {
                localStorage.clear();
            }
        }

        return Promise.reject(error);
    },
);

export const setAuthToken = (token?: string) => {
    if (token) {
        instance.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete instance.defaults.headers.common.Authorization;
    }
};

export default instance;
