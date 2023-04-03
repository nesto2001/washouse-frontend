import { API_LOGIN, API_ME, API_REFRESH_TOKEN, API_REGISTER_CUSTOMER } from '../common/Constant';
import { LoginResponse } from '../models/LoginResponse';
import { Response } from '../models/CommonModel';
import instance from '../services/axios/AxiosInstance';
import { UserResponse } from '../models/User/UserResponse';
import { UserModel } from '../models/User/UserModel';

export const login = async ({ phone, password }: { phone: string; password: string }) => {
    const response = await instance.post<Response<LoginResponse>>(API_LOGIN, {
        phone,
        password,
    });
    return response;
};

export const registerCustomer = async ({
    phone,
    password,
    confirmPass,
    email,
}: {
    phone: string;
    password: string;
    email: string;
    confirmPass: string;
}) => {
    const response = await instance.post<LoginResponse>(API_REGISTER_CUSTOMER, {
        phone,
        password,
        confirmPass,
        email,
    });
    return response;
};

export const getMe = async (): Promise<UserModel> => {
    const { data } = await instance.get<UserResponse>(API_ME, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return {
        accountId: data.data.accountId,
        avatar: data.data.avatar,
        email: data.data.email,
        name: data.data.name,
        phone: data.data.phone,
        roleType: data.data.roleType,
    };
};

export const refresh = async ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
    const response = await instance.post<Response<LoginResponse>>(API_REFRESH_TOKEN, {
        accessToken: accessToken,
        refreshToken: refreshToken,
    });
    return response;
};
