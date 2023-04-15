import { CenterResponse } from '../Center/CenterResponse';

export type PromotionResponse = {
    id: number;
    code: string;
    description: string;
    discount: number;
    startDate: string;
    expireDate: string;
    createdDate: string;
    updatedDate: string;
    useTimes: number;
    isAvailable: boolean;
};
