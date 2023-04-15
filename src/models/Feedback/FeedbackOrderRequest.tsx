export type FeedbackOrderRequest = {
    orderId: string;
    centerId: number;
    content?: string;
    rating: number;
};
