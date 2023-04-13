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
import { Response } from '../models/CommonModel';
import { UpdateAddressRequest } from '../models/Customer/UpdateAddressRequest';
import { UpdateAvatarRequest } from '../models/Customer/UpdateAvatarRequest';
import { UpdateProfileRequest } from '../models/Customer/UpdateCustomerRequest';
import { WalletModel } from '../models/Wallet/WalletModel';
import { WalletResponse } from '../models/Wallet/WalletResponse';
import instance from '../services/axios/AxiosInstance';

export const getUserProfile = async (id: number): Promise<AccountModel> => {
    const { data } = await instance.get<Response<AccountResponse>>(
        API_ACCOUNT_DETAILS.replace('${id}', id.toString()),
        {},
    );
    return {
        accountId: data.data.id,
        avatar: data.data.profilePic,
        email: data.data.email,
        fullName: data.data.fullName,
        dob: data.data.dob,
        phone: data.data.phone,
        locationId: data.data.locationId,
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
