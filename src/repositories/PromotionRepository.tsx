import { API_PROMOTION } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { PromotionRequest } from '../models/Promotion/CreatePromotionRequest';
import { PromotionModel } from '../models/Promotion/PromotionModel';
import { PromotionResponse } from '../models/Promotion/PromotionResponse';
import instance from '../services/axios/AxiosInstance';

export const getPromotions = async (): Promise<PromotionModel[]> => {
    const { data } = await instance.get<Response<PromotionResponse[]>>(API_PROMOTION, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return data.data.map((promotion) => {
        return {
            id: promotion.id,
            code: promotion.code,
            centerId: promotion.centerId,
            description: promotion.description,
            discount: promotion.discount,
            expireDate: new Date(promotion.expireDate),
            startDate: new Date(promotion.startDate),
            useTimes: promotion.useTimes,
        };
    });
};

export const createPromotion = async (request: PromotionRequest) => {
    const { status } = await instance.post(API_PROMOTION, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status !== 200) {
        throw new Error();
    }
};
