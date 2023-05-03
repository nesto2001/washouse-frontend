import { TransactionResponse } from '../Wallet/TransactionResponse';
import { WalletTransactionResponse } from '../Wallet/WalletTransactionResponse';

export type CenterWalletResponse = {
    walletId: number;
    balance: number;
    status: string;
    transactions: TransactionResponse[];
    walletTransactions: WalletTransactionResponse[];
};
