export type UserModel = {
    accountId: number;
    email: string;
    phone: string;
    roleType: string;
    name: string;
    centerId?: number | null;
    avatar: string;
    dob?: string | null;
    locationId?: number | null;
    gender?: number | null;
};
