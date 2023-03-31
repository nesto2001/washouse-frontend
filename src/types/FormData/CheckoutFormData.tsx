export type CheckoutFormData = {
    fullname: string;
    address: string;
    city: number;
    district: number;
    wardId: number;
    email: string;
    phone: string;
    delivery: {
        type: number;
        freight: number;
    };
    paymentType: number;
};
