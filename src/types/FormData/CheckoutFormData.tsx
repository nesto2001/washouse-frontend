export type CheckoutFormData = {
    firstName: string;
    lastName: string;
    address: string;
    city: number;
    district: number;
    ward: number;
    email: string;
    phone: string;
    delivery: {
        type: number;
        freight: number;
    };
    paymentType: number;
};
