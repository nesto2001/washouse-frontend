import {
    API_ACCOUNT,
    API_ACCOUNT_DETAILS,
    API_ACCOUNT_PROFILE,
    API_ACCOUNT_PROFILE_ADDRESS,
    API_ACCOUNT_PROFILE_PIC,
} from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import { UpdateAddressRequest } from '../models/Customer/UpdateAddressRequest';
import { UpdateAvatarRequest } from '../models/Customer/UpdateAvatarRequest';
import { UpdateProfileRequest } from '../models/Customer/UpdateCustomerRequest';
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

export const updateAccountProfile = async (request: UpdateProfileRequest) => {
    const { status } = await instance.put(API_ACCOUNT_PROFILE, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status !== 200) {
        throw new Error();
    }
};

export const updateAccountProfilePic = async (request: UpdateAvatarRequest) => {
    const { status } = await instance.put(API_ACCOUNT_PROFILE_PIC, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status !== 200) {
        throw new Error();
    }
};

export const updateAccountAddress = async (request: UpdateAddressRequest) => {
    const { status } = await instance.put(API_ACCOUNT_PROFILE_ADDRESS, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status !== 200) {
        throw new Error();
    }
};
