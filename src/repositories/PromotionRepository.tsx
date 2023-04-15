import {
    API_PROMOTION,
    API_PROMOTION_ACTIVATE,
    API_PROMOTION_CENTER,
    API_PROMOTION_CODE,
    API_PROMOTION_DEACTIVATE,
} from '../common/Constant';
import {
    ActivatePromotionFormData,
    UpdatePromotionFormData,
} from '../containers/ManagerContainer/CenterPromotionContainer/CenterPromotionsContainer';
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
            description: promotion.description,
            discount: promotion.discount,
            expireDate: promotion.expireDate,
            startDate: promotion.startDate,
            useTimes: promotion.useTimes,
            available: promotion.isAvailable,
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

export const applyPromotion = async (promoCode: string): Promise<number> => {
    const { data } = await instance.get<Response<number>>(API_PROMOTION_CODE.replace('${code}', promoCode), {});
    if (data.data === null) {
        throw new Error('Mã khuyến mã không hợp lệ');
    }
    if (data.data) {
        return data.data;
    } else {
        return 0;
    }
};

export const getPromotionsCenter = async (centerId: number): Promise<PromotionModel[]> => {
    const { data } = await instance.get<Response<PromotionResponse[]>>(
        API_PROMOTION_CENTER.replace('${id}', centerId.toString()),
    );
    return data.data.map((promotion) => {
        return {
            id: promotion.id,
            code: promotion.code,
            available: promotion.isAvailable,
            description: promotion.description,
            discount: promotion.discount,
            expireDate: promotion.expireDate,
            startDate: promotion.startDate,
            useTimes: promotion.useTimes,
        };
    });
};

export const deactivatePromotion = async (promotionId: number) => {
    const response = await instance.put(API_PROMOTION_DEACTIVATE, undefined, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
            promotionId: promotionId,
        },
    });
    return response;
};

export const activatePromotion = async ({ id, expireDate, useTimes }: ActivatePromotionFormData) => {
    const response = await instance.put(API_PROMOTION_ACTIVATE, undefined, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        params: {
            promotionId: id,
            expireDate: expireDate?.format('DD-MM-YYYY'),
            useTimes: useTimes,
        },
    });
    return response;
};

export const updatePromotion = async ({ id, expireDate, useTimes, startDate }: UpdatePromotionFormData) => {
    const { status } = await instance.put(
        API_PROMOTION,
        {
            expireDate: expireDate?.format('DD-MM-YYYY') ?? undefined,
            startDate: startDate?.format('DD-MM-YYYY') ?? undefined,
            useTimes: useTimes ?? undefined,
        },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
            params: {
                promotionId: id,
            },
        },
    );
    if (status !== 200) {
        throw new Error();
    }
};
