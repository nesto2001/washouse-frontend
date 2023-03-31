export type AccountResponse = {
    id: number;
    phone: string;
    email: string;
    password: string;
    fullName: string;
    dob: string;
    status: string;
    roleType: string;
    profilePic?: string;
    locationId?: number;
    isResetPassword: boolean;
    lastLogin: string;
    location: string;
    customers: [];
    notificationAccounts: [];
    posts: [];
    staff: [];
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
};