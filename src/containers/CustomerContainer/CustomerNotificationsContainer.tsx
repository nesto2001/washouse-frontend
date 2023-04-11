import { Badge, Button, Empty, List } from 'antd';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { getNotifications, readNotification } from '../../repositories/NotificationRepository';
import { Link } from 'react-router-dom';
import { timeSince } from '../../utils/TimeUtils';

type Notification = {
    id: number;
    title: string;
    body: string;
    createdDate: Date;
    isRead: boolean;
};

type Props = {
    size?: number;
};

const CustomerNotificationsContainer = ({ size }: Props) => {
    const [numOfUnread, setNumOfUnread] = useState<number>();
    const [notifications, setNotifications] = useState<Notification[]>();

    useEffect(() => {
        getNotifications().then((res) => {
            setNumOfUnread(res.numOfUnread);
            setNotifications(
                res.notifications?.map((notif) => {
                    return {
                        id: notif.id,
                        title: notif.title,
                        body: notif.content,
                        createdDate: notif.createdDate,
                        isRead: notif.isRead,
                    };
                }),
            );
        });
    }, []);

    const handleRead = (id: number) => {
        readNotification(id);

        getNotifications().then((res) => {
            setNumOfUnread(res.numOfUnread);
            setNotifications(
                res.notifications?.map((notif) => {
                    return {
                        id: notif.id,
                        title: notif.title,
                        body: notif.content,
                        createdDate: notif.createdDate,
                        isRead: notif.isRead,
                    };
                }),
            );
        });
    };

    return (
        <div className="usernoti w-full border border-wh-gray rounded-2xl mb-10">
            <div className="usernoti--header pt-4 pl-6 font-bold text-xl">Thông báo</div>
            <hr className="mt-3 mb-8" />
            <div className="usernoti--content flex justify-center px-14 mb-16">
                {notifications ? (
                    <List
                        className="w-full"
                        itemLayout="horizontal"
                        locale={{
                            emptyText: (
                                <Empty
                                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                                    imageStyle={{ height: 160, width: 384, margin: '0 auto', marginBottom: 20 }}
                                    description={
                                        <span className="text-xl font-medium text-sub-gray">
                                            Bạn chưa có thông báo nào
                                        </span>
                                    }
                                ></Empty>
                            ),
                        }}
                        dataSource={notifications
                            ?.sort(
                                (nof1: Notification, nof2: Notification) =>
                                    nof2.createdDate.getTime() - nof1.createdDate.getTime(),
                            )
                            .slice(0, size ?? 5)}
                        footer={
                            notifications && notifications.length > 0 ? (
                                <div className="text-center cursor-pointer text-primary">Xem thêm</div>
                            ) : (
                                <></>
                            )
                        }
                        renderItem={(item, index) => (
                            <List.Item
                                className="cursor-pointer hover:bg-gray-50"
                                onClick={() => {
                                    !item.isRead && handleRead(item.id);
                                }}
                            >
                                <List.Item.Meta
                                    title={
                                        <div className="flex justify-between">
                                            <div
                                                className={`font-bold ${!item.isRead ? 'text-primary' : 'text-black'}`}
                                            >
                                                {item.title}
                                            </div>
                                            <div className="text-sub-gray">{timeSince(item.createdDate)}</div>
                                        </div>
                                    }
                                    description={
                                        <div className="flex justify-between">
                                            <div>{item.body}</div>
                                            {!item.isRead && <Badge color="red" />}
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty
                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                        imageStyle={{ height: 160, width: 384 }}
                        description={
                            <span className="text-xl font-medium text-sub-gray">Đăng nhập để xem thông báo</span>
                        }
                    >
                        <div className="flex gap-6 w-full justify-center">
                            <Link to={'/register'}>
                                <Button type="default" className="bg-transparent">
                                    Đăng ký
                                </Button>
                            </Link>
                            <Link to={'/login'}>
                                <Button type="primary">Đăng nhập</Button>
                            </Link>
                        </div>
                    </Empty>
                )}
            </div>
        </div>
    );
};

export default CustomerNotificationsContainer;
