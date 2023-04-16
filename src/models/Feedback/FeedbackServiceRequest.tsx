export type FeedbackServiceRequest = {
    serviceId: number;
    centerId: number;
    content?: string;
    rating: number;
};
