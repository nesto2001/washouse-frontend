import dayjs from 'dayjs';

export type FeedbackOrderModel = {
    content: string;
    rating: number;
    replyMessage: string;
    replyBy: string;
    createdBy: string;
    createdDate: dayjs.Dayjs;
    replyDate: dayjs.Dayjs;
};
