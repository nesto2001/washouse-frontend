import { NotificationModel } from './NotificationModel';

export type NotificationListModel = {
    numOfUnread: number;
    notifications: NotificationModel[];
};
