export type AdminCenterFeedbackResponse = {
    id: number;
    rating: number;
    content: string;
    createdBy: string;
    createdDate: string;
    replyMessage: string;
    replyBy: string;
    orderId: string;
    services: [{ id: string; name: string }];
    replyDate: string;
};
