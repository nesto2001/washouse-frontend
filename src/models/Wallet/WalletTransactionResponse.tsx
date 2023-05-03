export type WalletTransactionResponse = {
    paymentId: number;
    type: string;
    status: string;
    plusOrMinus: string;
    amount: number;
    timeStamp: string;
    updateTimeStamp: string;
};
