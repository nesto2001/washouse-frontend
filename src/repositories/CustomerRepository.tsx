import { API_ACCOUNT_DETAILS, API_CUSTOMER } from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import { UpdateCustomerRequest } from '../models/Customer/UpdateCustomerRequest';
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

export const updateCustomerProfile = async (id: number, request: UpdateCustomerRequest) => {
    const { status } = await instance.put(API_CUSTOMER, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
            customerId: id,
        },
    });
    if (status !== 200) {
        throw new Error();
    }
};
