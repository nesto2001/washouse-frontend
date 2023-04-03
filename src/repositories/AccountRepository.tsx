import { API_ACCOUNT, API_ACCOUNT_DETAILS, API_LOGIN, API_ME } from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import { LoginResponse } from '../models/LoginResponse';
import { UserModel } from '../models/User/UserModel';
import { UserResponse } from '../models/User/UserResponse';
import instance from '../services/axios/AxiosInstance';

export const getUserProfile = async (id: number): Promise<AccountModel> => {
    const { data } = await instance.get<AccountResponse>(API_ACCOUNT_DETAILS.replace('${id}', id.toString()), {});
    return {
        accountId: data.id,
        avatar: data.profilePic,
        email: data.email,
        fullName: data.fullName,
        dob: data.dob,
        phone: data.phone,
        locationId: data.locationId,
    };
};

export const getAllAccounts = async (): Promise<AccountModel[]> => {
    const { data } = await instance.get<AccountResponse[]>(API_ACCOUNT, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });
    return data.map((item): AccountModel => {
        return {
            accountId: item.id,
            avatar: item.profilePic,
            email: item.email,
            fullName: item.fullName,
            dob: item.dob,
            phone: item.phone,
            locationId: item.locationId,
            status: item.status,
        };
    });
};
