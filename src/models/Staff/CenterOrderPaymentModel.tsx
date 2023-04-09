export type CenterOrderPaymentModel = {
    total: number; //pay amount
    platformFee: number;
    dateIssue: string;
    status: string;
    method: number; //method 0: cash, method 1: vnPay
    promoCode: string;
    discount: number; //discount %
    createdDate: string;
    updatedDate: string;
};
