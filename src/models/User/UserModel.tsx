export type UserModel = {
    accountId: number;
    email: string;
    phone: string;
    roleType: string;
    name: string;
    avatar: string;
    dob?: string | null;
    locationId?: number | null;
    gender?: number | null;
};
