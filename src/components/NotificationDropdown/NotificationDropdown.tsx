import { Badge, Button, Empty, Image, List, Popover, notification } from 'antd';
import { timeSince } from '../../utils/TimeUtils';
import { getNotifications, readNotification } from '../../repositories/NotificationRepository';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { startSignalRConnection } from '../../hubs/notificationHub';
import { NotificationModel } from '../../models/Notification/NotificationModel';
import { NotificationPlacement } from 'antd/es/notification/interface';

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

const Context = React.createContext({ name: 'Default' });

const NotificationDropdown = ({ showBadge, child, size }: Props) => {
    const [numOfUnread, setNumOfUnread] = useState<number>();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [api, contextHolder] = notification.useNotification();
    const [update, updateState] = useState({});
    const forceUpdate = useCallback(() => updateState({}), []);

    const connection = startSignalRConnection();

    const openNotification = (title: string, content: string) => {
        api.info({
            message: `${title}`,
            description: content,
            placement: 'bottomRight',
        });
    };

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

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
    }, [update]);

    useEffect(() => {
        connection.on('UpdateOrderStatus', (notification: Notification) => {
            console.log(notification, '1');
            forceUpdate();
            openNotification(notification.title, notification.body);
        });

        connection
            .start()
            .then(() => console.log('connection start'))
            .catch((err) => console.error(err, 'Lỗi kết nối signalR'));

        return () => {
            connection.stop().catch((err) => console.error(err));
        };
    }, [connection]);

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
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Popover
                align={{ offset: [0, 20] }}
                placement="bottomRight"
                content={
                    notifications ? (
                        <List
                            className="w-96"
                            itemLayout="horizontal"
                            locale={{
                                emptyText: (
                                    <Empty
                                        image={Empty.PRESENTED_IMAGE_DEFAULT}
                                        imageStyle={{ height: 160, width: 320, margin: '0 auto', marginBottom: 20 }}
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
                            header={<div className="text-lg font-bold">Thông báo</div>}
                            footer={
                                notifications.length ? (
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
                                                    className={`font-bold ${
                                                        !item.isRead ? 'text-primary' : 'text-black'
                                                    }`}
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
        </Context.Provider>
    );
};

export default NotificationDropdown;
