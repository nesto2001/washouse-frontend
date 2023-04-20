import dayjs from 'dayjs';

export type FeedbackModel = {
    id: number;
    content: string;
    rating: number;
    orderId: number;
    centerId: number;
    centerName: number;
    serviceId: number;
    serviceName: string;
    replyMessage: string;
    createDate: dayjs.Dayjs;
    replyDate: dayjs.Dayjs;
};
