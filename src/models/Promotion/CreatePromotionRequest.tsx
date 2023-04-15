export type PromotionRequest = {
    code: string;
    description?: string;
    discount: number;
    startDate: string;
    expireDate: string;
    useTimes: number;
};
