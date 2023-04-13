import { TransactionModel } from './TransactionModel';
import { WalletTransactionModel } from './WalletTransactionModel';

export type WalletModel = {
    walletId: number;
    balance: number;
    status: string;
    transactions: TransactionModel[];
    walletTransactions: WalletTransactionModel[];
};
