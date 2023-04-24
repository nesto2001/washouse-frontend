import dayjs from 'dayjs';

export type AdminCenterFeedbackModel = {
    id: number;
    rating: number;
    content: string;
    createdBy: string;
    createdDate: dayjs.Dayjs;
    replyMessage: string;
    replyBy: string;
    replyDate: dayjs.Dayjs;
};
