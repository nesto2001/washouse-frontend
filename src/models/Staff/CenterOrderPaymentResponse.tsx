export type CenterOrderPaymentResponse = {
    paymentTotal: number; //pay amount
    platformFee: number;
    dateIssue: string;
    status: string;
    paymentMethod: number; //method 0: cash, method 1: vnPay
    promoCode: string;
    discount: number; //discount %
    createdDate: string;
    updatedDate: string;
};
