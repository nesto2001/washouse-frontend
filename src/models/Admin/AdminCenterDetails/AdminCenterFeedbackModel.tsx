import dayjs from 'dayjs';

export type AdminCenterFeedbackModel = {
    id: number;
    rating: number;
    content: string;
    createdBy: string;
    createdDate: dayjs.Dayjs;
    replyMessage: string;
    replyBy: string;
    orderId: string;
    services: [{ id: string; name: string }];
    replyDate: dayjs.Dayjs;
};
