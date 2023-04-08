import { NotificationResponse } from './NotificationResponse';

export type NotificationListResponse = {
    numOfUnread: number;
    notifications: NotificationResponse[];
};
