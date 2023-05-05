import parse from 'date-fns/parse';
import { API_NOTIFICATION, API_NOTIFICATION_READ } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { NotificationListModel } from '../models/Notification/NotificationListModel';
import { NotificationListResponse } from '../models/Notification/NotificationListResponse';
import { NotificationModel } from '../models/Notification/NotificationModel';
import instance from '../services/axios/AxiosInstance';

export const getNotifications = async (): Promise<NotificationListModel> => {
    const { data } = await instance.get<Response<NotificationListResponse>>(API_NOTIFICATION, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });

    return {
        numOfUnread: data.data.numOfUnread,
        notifications: data.data.notifications.map((item): NotificationModel => {
            return {
                accountId: item.accountId,
                title: item.title,
                content: item.content,
                createdDate: parse(item.createdDate, 'dd-MM-yyyy HH:mm:ss', new Date()),
                id: item.id,
                orderId: item.orderId,
                isRead: item.isRead,
            };
        }),
    };
};

export const readNotification = async (id: number) => {
    const { status } = await instance.post(
        API_NOTIFICATION_READ,
        {},
        {
            params: {
                notiId: id,
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );

    if (status != 200) {
        throw new Error();
    }
};
