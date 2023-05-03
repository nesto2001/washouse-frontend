import { TransactionModel } from '../Wallet/TransactionModel';
import { WalletTransactionModel } from '../Wallet/WalletTransactionModel';

export type CenterWalletModel = {
    walletId: number;
    balance: number;
    status: string;
    transactions: TransactionModel[];
    walletTransactions: WalletTransactionModel[];
};
