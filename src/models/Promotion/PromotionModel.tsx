export type PromotionModel = {
    id: number;
    code: string;
    description: string;
    discount: number;
    startDate: Date;
    expireDate: Date;
    useTimes: number;
    centerId: number;
};
