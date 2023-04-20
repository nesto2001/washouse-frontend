export type CenterFeedbackResponse = {
    id: number;
    content: string;
    rating: number;
    orderId: string;
    centerId: number;
    centerName: string;
    serviceId: number | null;
    serviceName: string | null;
    createdBy: string;
    createdDate: string;
    replyMessage: string | null;
    replyBy: string | null;
    replyDate: string | null;
};
