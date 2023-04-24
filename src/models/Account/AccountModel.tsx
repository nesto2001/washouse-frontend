import dayjs from 'dayjs';

export type AccountModel = {
    id: number;
    phone: string;
    email: string;
    fullName: string;
    gender: number;
    dob?: dayjs.Dayjs;
    status: boolean;
    isAdmin: boolean;
    profilePic: string;
};
