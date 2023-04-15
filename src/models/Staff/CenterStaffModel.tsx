import dayjs from 'dayjs';

export type CenterStaffModel = {
    id: number;
    fullname: string;
    dob: dayjs.Dayjs;
    phone: string;
    email: string;
    status: boolean;
    isManager: boolean;
    idNumber: string;
    idFrontImg?: string;
    idBackImg?: string;
};
