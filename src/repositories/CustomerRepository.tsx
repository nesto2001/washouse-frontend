import { API_ACCOUNT_DETAILS } from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import instance from '../services/axios/AxiosInstance';

export const getCustomerProfile = async (id: number): Promise<AccountModel> => {
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
