import { TransactionReponse } from './TransactionResponse';
import { WalletTransactionReponse } from './WalletTransactionResponse';

export type WalletResponse = {
    walletId: number;
    balance: number;
    status: string;
    transactions: TransactionReponse[];
    walletTransactions: WalletTransactionReponse[];
};
