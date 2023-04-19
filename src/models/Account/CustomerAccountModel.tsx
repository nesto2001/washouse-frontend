import { AddressDataType } from '../../types/AddressDataType';

export type CustomerAccountModel = {
    id: number;
    accountId: number;
    fullname: string;
    phone: string;
    email: string;
    profilePic: string;
    addressString: string;
    address: AddressDataType;
    gender: number;
    dob: string;
    walletId: number;
};
