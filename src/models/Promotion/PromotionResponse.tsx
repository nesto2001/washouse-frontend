import { CenterResponse } from '../Center/CenterResponse';

export type PromotionResponse = {
    id: number;
    code: string;
    description: string;
    discount: number;
    startDate: string;
    expireDate: string;
    createdDate: string;
    createdBy: string;
    updatedDate: string;
    updatedBy: string;
    useTimes: number;
    centerId: number;
    center: CenterResponse;
    payments: string;
};
