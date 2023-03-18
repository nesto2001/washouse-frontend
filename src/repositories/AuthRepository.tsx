import { API_LOGIN } from '../common/Constant';
import { LoginResponse } from '../models/LoginResponse';
import { Response } from '../models/CommonModel';
import instance from '../services/axios/AxiosInstance';
import { UserResponse } from '../models/User/UserResponse';
import { UserModel } from '../models/User/UserModel';

export const login = async ({ phone, password }: { phone: string; password: string }) => {
    const response = await instance.post<LoginResponse>(API_LOGIN, {
        phone,
        password,
    });
    return response;
};

export const getMe = async (): Promise<UserModel> => {
    const { data } = await instance.get<UserResponse>('api/account/me', {
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
