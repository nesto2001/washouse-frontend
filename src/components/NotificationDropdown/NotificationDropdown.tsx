import { Badge, Button, Empty, Image, List, Popover } from 'antd';
import { timeSince } from '../../utils/TimeUtils';
import { getNotifications, readNotification } from '../../repositories/NotificationRepository';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

type Notification = {
    id: number;
    title: string;
    body: string;
    createdDate: Date;
    isRead: boolean;
};

type Props = {
    size?: number;
    showBadge: boolean;
    child: React.ReactNode;
};

const NotificationDropdown = ({ showBadge, child, size }: Props) => {
    const [numOfUnread, setNumOfUnread] = useState<number>();
    const [notifications, setNotifications] = useState<Notification[]>();

    useEffect(() => {
        getNotifications().then((res) => {
            setNumOfUnread(res.numOfUnread);
            setNotifications(
                res.notifications?.map((notif) => {
                    return {
                        id: notif.id,
                        title: 'Notification title',
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
                        title: 'Notification title',
                        body: notif.content,
                        createdDate: notif.createdDate,
                        isRead: notif.isRead,
                    };
                }),
            );
        });
    };
    return (
        <Popover
            align={{ offset: [0, 20] }}
            placement="bottomRight"
            content={
                notifications ? (
                    <List
                        className="w-96"
                        itemLayout="horizontal"
                        dataSource={notifications
                            ?.sort(
                                (nof1: Notification, nof2: Notification) =>
                                    nof2.createdDate.getTime() - nof1.createdDate.getTime(),
                            )
                            .slice(0, size ?? 5)}
                        header={<div className="text-lg font-bold">Thông báo</div>}
                        footer={
                            notifications ? (
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
                        description={<span>Đăng nhập để xem thông báo</span>}
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
                )
            }
            arrow={false}
        >
            <Badge count={showBadge ? numOfUnread : 0} size="small" overflowCount={99}>
                <div className="text-xl cursor-pointer">{child}</div>
            </Badge>
        </Popover>
    );
};

export default NotificationDropdown;
