import { TransactionResponse } from "./TransactionResponse";
import { WalletTransactionResponse } from "./WalletTransactionResponse";

export type WalletResponse = {
    walletId: number;
    balance: number;
    status: string;
    transactions: TransactionResponse[];
    walletTransactions: WalletTransactionResponse[];
};
