export type PromotionModel = {
    id: number;
    code: string;
    description: string;
    discount: number;
    startDate: string;
    expireDate: string;
    useTimes: number;
    available: boolean;
};
