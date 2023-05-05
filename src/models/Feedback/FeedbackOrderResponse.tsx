export type FeedbackOrderResponse = {
    id?: number | null;
    content: string;
    rating: number;
    createdBy: string;
    createdDate: string;
    replyMessage: string;
    replyBy: string;
    replyDate: string;
};
