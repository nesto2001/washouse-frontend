export type CenterStaffResponse = {
    id: number;
    accountId: number;
    fullName: string;
    dob: string;
    phone: string;
    gender: number;
    email: string;
    profilePic: string;
    centerId: number;
    status: boolean;
    isManager: boolean;
    idNumber: string;
    idFrontImg?: string;
    idBackImg?: string;
};
