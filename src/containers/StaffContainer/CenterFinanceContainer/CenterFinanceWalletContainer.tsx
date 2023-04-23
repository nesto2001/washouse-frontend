import { Avatar, Empty, List, Skeleton, Tag } from 'antd';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { formatCurrency } from '../../../utils/FormatUtils';
import { getMyWallet } from '../../../repositories/AccountRepository';
import { WalletModel } from '../../../models/Wallet/WalletModel';
import { TransactionModel } from '../../../models/Wallet/TransactionModel';
import Deposit from '../../../assets/images/deposit.svg';
import Withdrawal from '../../../assets/images/withdrawal.svg';
import { TransactionBadgeStatusMap } from '../../../mapping/BadgeStatusMap';
import { TransactionStatusMap } from '../../../mapping/TransactionStatusMap';
import { Link } from 'react-router-dom';

type Props = {};

const CenterFinanceWalletContainer = (props: Props) => {
    const [myWallet, setMyWallet] = useState<WalletModel>();
    const [list, setList] = useState<TransactionModel[]>([]);
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getMyWallet().then((res) => {
            setMyWallet(res);
            setList(res.transactions);
            setInitLoading(false);
        });
    }, []);

    return (
        <div className="">
            <div className="userwallet--content flex flex-col items-start justify-start px-6 mb-4">
                {myWallet ? (
                    <>
                        <div className="userwallet--balance bg-primary px-6 p-4 text-white text-base font-medium rounded-lg">
                            Số dư:
                            <span className="userwallet__balance--amount text-xl font-bold ml-2">
                                {formatCurrency(myWallet.balance)}
                            </span>
                        </div>
                        <div className="userwallet--transaction w-full mt-3">
                            <div className="font-bold text-xl my-3">Lịch sử nạp tiền</div>
                            {myWallet.transactions && (
                                <List
                                    loading={initLoading}
                                    className="w-full items-center"
                                    itemLayout="vertical"
                                    dataSource={myWallet.transactions}
                                    renderItem={(item, index) => (
                                        <List.Item
                                            extra={
                                                <div
                                                    className={`text-xl font-bold ${
                                                        item.type.toLowerCase() === 'deposit'
                                                            ? 'text-green'
                                                            : 'text-red'
                                                    }`}
                                                >
                                                    {item.plusOrMinus.toLowerCase() === 'plus' ? '+ ' : '- '}
                                                    {formatCurrency(item.amount)}
                                                </div>
                                            }
                                        >
                                            <Skeleton avatar title={false} loading={initLoading}>
                                                <List.Item.Meta
                                                    style={{ alignItems: 'center', gap: 12 }}
                                                    avatar={
                                                        <Avatar
                                                            src={
                                                                item.type.toLowerCase() === 'deposit'
                                                                    ? Deposit
                                                                    : Withdrawal
                                                            }
                                                            shape="circle"
                                                            size={56}
                                                        />
                                                    }
                                                    title={
                                                        item.type.toLowerCase() === 'deposit' ? (
                                                            <div className="font-bold text-base">Nạp tiền vào ví</div>
                                                        ) : (
                                                            <div className="font-bold text-base">Rút tiền khỏi ví</div>
                                                        )
                                                    }
                                                    description={
                                                        <>
                                                            <div className="font-sm text-medium -mt-2">
                                                                <Tag
                                                                    color={
                                                                        TransactionBadgeStatusMap[
                                                                            item.status ?? 'default'
                                                                        ]
                                                                    }
                                                                >
                                                                    {
                                                                        TransactionStatusMap[
                                                                            item.status.toLocaleLowerCase() ?? ''
                                                                        ]
                                                                    }
                                                                </Tag>
                                                            </div>
                                                            <div className="mt-2">{item.timeStamp}</div>
                                                        </>
                                                    }
                                                />
                                            </Skeleton>
                                        </List.Item>
                                    )}
                                />
                            )}
                        </div>
                    </>
                ) : (
                    <Empty
                        className="w-full"
                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                        imageStyle={{ height: 160, width: '100%' }}
                        description={
                            <span className="text-xl font-medium text-sub-gray">
                                Bạn chưa kích hoạt ví Washouse, nhấn{' '}
                                <Link className="text-primary" to="/provider/finance/settings">
                                    vào đây
                                </Link>{' '}
                                để kích hoạt
                            </span>
                        }
                    >
                        <div className="flex gap-6 w-full justify-center"></div>
                    </Empty>
                )}
            </div>
        </div>
    );
};

export default CenterFinanceWalletContainer;
