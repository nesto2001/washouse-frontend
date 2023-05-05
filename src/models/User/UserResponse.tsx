export type UserResponse = {
    success: boolean;
    message: string;
    data: {
        tokenId: string;
        accountId: number;
        email: string;
        phone: string;
        roleType: string;
        name: string;
        avatar: string;
        centerManaged?: number;
        locationId: number | null;
        gender: number | null;
        dob: 'string' | null;
    };
};
