import { API_ACCOUNT, API_LOGIN, API_ME } from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import { LoginResponse } from '../models/LoginResponse';
import { UserModel } from '../models/User/UserModel';
import { UserResponse } from '../models/User/UserResponse';
import instance from '../services/axios/AxiosInstance';

export const getUserProfile = async (id: number): Promise<AccountModel> => {
    const { data } = await instance.get<AccountResponse>(`/api/accounts/${id}`, {
        params: {
            id: id,
        },
    });
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
