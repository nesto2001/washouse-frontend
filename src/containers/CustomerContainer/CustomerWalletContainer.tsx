import * as React from 'react';
import { useState, useEffect } from 'react';
import { WalletModel } from '../../models/Wallet/WalletModel';
import { getMyWallet } from '../../repositories/AccountRepository';
import { Avatar, Empty, List, Skeleton, Tag } from 'antd';
import { formatCurrency } from '../../utils/FormatUtils';
import Deposit from '../../assets/images/deposit.svg';
import Withdrawal from '../../assets/images/withdrawal.svg';
import Payment from '../../assets/images/payment.svg';
import { TransactionStatusMap } from '../../mapping/TransactionStatusMap';
import { TransactionBadgeStatusMap } from '../../mapping/BadgeStatusMap';
import { TransactionModel } from '../../models/Wallet/TransactionModel';

type Props = {};

const CustomerWalletContainer = (props: Props) => {
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
        <div className="userwallet w-full border border-wh-gray rounded-2xl mb-3">
            <div className="userwallet--header pt-4 pl-6 font-bold text-xl">Ví của tôi</div>
            <hr className="mt-3 mb-8" />
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
                    // <List
                    //     className="w-full"
                    //     itemLayout="horizontal"
                    //     locale={{
                    //         emptyText: (
                    //             <Empty
                    //                 image={Empty.PRESENTED_IMAGE_DEFAULT}
                    //                 imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                    //                 description={
                    //                     <span className="text-xl font-medium text-sub-gray">
                    //                         Bạn chưa có thông báo nào
                    //                     </span>
                    //                 }
                    //             ></Empty>
                    //         ),
                    //     }}
                    //     dataSource={notifications
                    //         ?.sort(
                    //             (nof1: Notification, nof2: Notification) =>
                    //                 nof2.createdDate.getTime() - nof1.createdDate.getTime(),
                    //         )
                    //         .slice(0, size ?? 5)}
                    //     footer={
                    //         notifications && notifications.length > 0 ? (
                    //             <div className="text-center cursor-pointer text-primary">Xem thêm</div>
                    //         ) : (
                    //             <></>
                    //         )
                    //     }
                    //     renderItem={(item, index) => (
                    //         <List.Item
                    //             className="cursor-pointer hover:bg-gray-50"
                    //             onClick={() => {
                    //                 !item.isRead && handleRead(item.id);
                    //             }}
                    //         >
                    //             <List.Item.Meta
                    //                 title={
                    //                     <div className="flex justify-between">
                    //                         <div
                    //                             className={`font-bold ${!item.isRead ? 'text-primary' : 'text-black'}`}
                    //                         >
                    //                             {item.title}
                    //                         </div>
                    //                         <div className="text-sub-gray">{timeSince(item.createdDate)}</div>
                    //                     </div>
                    //                 }
                    //                 description={
                    //                     <div className="flex justify-between">
                    //                         <div>{item.body}</div>
                    //                         {!item.isRead && <Badge color="red" />}
                    //                     </div>
                    //                 }
                    //             />
                    //         </List.Item>
                    //     )}
                    // />
                    <Empty
                        className="w-full"
                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                        imageStyle={{ height: 160, width: '100%' }}
                        description={
                            <span className="text-xl font-medium text-sub-gray">Bạn chưa kích hoạt ví Washouse</span>
                        }
                    >
                        <div className="flex gap-6 w-full justify-center">
                            {/* <Link to={'/register'}>
                                <Button type="default" className="bg-transparent">
                                    Đăng ký
                                </Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button type="primary">Đăng nhập</Button>
                            </Link> */}
                        </div>
                    </Empty>
                )}
            </div>
        </div>
    );
};

export default CustomerWalletContainer;
