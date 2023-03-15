import { API_LOGIN } from '../common/Constant';
import { LoginResponse } from '../models/LoginResponse';
import { Response } from '../models/CommonModel';
import instance from '../services/axios/AxiosInstance';

export async function login({ phone, password }: { phone: string; password: string }) {
    return await instance.post<LoginResponse>(API_LOGIN, {
        phone: phone,
        password: password,
    });
}
