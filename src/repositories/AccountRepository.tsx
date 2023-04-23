import {
    API_ACCOUNT,
    API_ACCOUNT_DETAILS,
    API_ACCOUNT_PROFILE,
    API_ACCOUNT_PROFILE_ADDRESS,
    API_ACCOUNT_PROFILE_PIC,
    API_ACCOUNT_WALLET,
} from '../common/Constant';
import { AccountModel } from '../models/Account/AccountModel';
import { AccountResponse } from '../models/Account/AccountResponse';
import { CustomerAccountModel } from '../models/Account/CustomerAccountModel';
import { CustomerAccountResponse } from '../models/Account/CustomerAccountResponse';
import { PaginationResponse, Response } from '../models/CommonModel';
import { UpdateAddressRequest } from '../models/Customer/UpdateAddressRequest';
import { UpdateAvatarRequest } from '../models/Customer/UpdateAvatarRequest';
import { UpdateProfileRequest } from '../models/Customer/UpdateCustomerRequest';
import { UserModel } from '../models/User/UserModel';
import { UserResponse } from '../models/User/UserResponse';
import { WalletModel } from '../models/Wallet/WalletModel';
import { WalletResponse } from '../models/Wallet/WalletResponse';
import instance from '../services/axios/AxiosInstance';

export const getUserProfile = async (id: number): Promise<CustomerAccountModel> => {
    const { data } = await instance.get<Response<CustomerAccountResponse>>(
        API_ACCOUNT_DETAILS.replace('${id}', id.toString()),
        {},
    );
    return {
        accountId: data.data.accountId,
        address: data.data.address
            ? {
                  addressString: data.data.address.addressString,
                  ward: {
                      wardId: data.data.address.ward.wardId,
                      wardName: data.data.address.ward.wardName,
                      district: {
                          districtId: data.data.address.ward.district.districtId,
                          districtName: data.data.address.ward.district.districtName,
                      },
                  },
                  latitude: data.data.address.latitude,
                  longitude: data.data.address.longitude,
              }
            : undefined,
        addressString: data.data.addressString ?? undefined,
        dob: data.data.dob,
        email: data.data.email,
        fullname: data.data.fullname,
        gender: data.data.gender,
        id: data.data.id,
        phone: data.data.phone,
        profilePic: data.data.profilePic,
        walletId: data.data.walletId,
    };
};

export const getAllAccounts = async (): Promise<AccountModel[]> => {
    const { data } = await instance.get<PaginationResponse<AccountResponse>>(API_ACCOUNT, {
        headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
    });
    return data.data.items.map((item): AccountModel => {
        return {
            id: item.id,
            profilePic: item.profilePic,
            email: item.email,
            gender: item.gender,
            isAdmin: item.isAdmin,
            fullName: item.fullName,
            dob: item.dob,
            phone: item.phone,
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

export const getMyWallet = async (): Promise<WalletModel> => {
    const { data } = await instance.get<Response<WalletResponse>>(API_ACCOUNT_WALLET, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return {
        walletId: data.data.walletId,
        balance: data.data.balance,
        status: data.data.status,
        transactions: data.data.transactions.map((trans) => {
            return {
                status: trans.status,
                type: trans.type,
                amount: trans.amount,
                plusOrMinus: trans.plusOrMinus,
                timeStamp: trans.timeStamp,
            };
        }),
        walletTransactions: data.data.walletTransactions.map((walTrans) => {
            return {
                amount: walTrans.amount,
                paymentId: walTrans.paymentId,
                plusOrMinus: walTrans.plusOrMinus,
                status: walTrans.status,
                timeStamp: walTrans.timeStamp,
                type: walTrans.type,
                updateTimeStamp: walTrans.updateTimeStamp,
            };
        }),
    };
};
