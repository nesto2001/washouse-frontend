import { API_NOTIFICATION } from '../common/Constant';
import { ListResponse } from '../models/CommonModel';
import { NotificationModel } from '../models/Notification/NotificationModel';
import { NotificationResponse } from '../models/Notification/NotificationResponse';
import instance from '../services/axios/AxiosInstance';

export const getNotifications = async (accountId: number): Promise<NotificationModel[]> => {
    const { data } = await instance.get<ListResponse<NotificationResponse>>(API_NOTIFICATION, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.map((item): NotificationModel => {
        return {
            accountId: item.accountId,
            content: item.content,
            createdDate: item.createdDate,
            id: item.id,
            orderId: item.orderId,
        };
    });
};
