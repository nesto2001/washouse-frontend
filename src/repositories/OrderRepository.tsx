import { API_ORDER_CREATE, API_ORDER_EST, API_REGISTER_CUSTOMER } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { LoginResponse } from '../models/LoginResponse';
import { CreateOrderRequest } from '../models/Order/CreateOrderRequest';
import { CreateOrderResponse } from '../models/Order/CreateOrderResponse';
import { DeliveryPriceRequest } from '../models/Order/DeliveryPriceRequest';
import { DeliveryPriceResponse } from '../models/Order/DeliveryPriceResponse';
import { EstimatedTimeModel } from '../models/Order/EstimatedTimeModel';
import { EstimatedTimeResponse } from '../models/Order/EstimatedTimeResponse';
import instance from '../services/axios/AxiosInstance';
import { CartItem } from '../types/CartType/CartItem';

export const getEstimateTime = async (cartItems: CartItem[]): Promise<EstimatedTimeModel> => {
    const response = await instance.post<Response<EstimatedTimeResponse>>(API_ORDER_EST, cartItems, {});
    return {
        estimated: response.data.data.totalEstimatedTime,
    };
};

export const calcDeliveryPrice = async (deliveryInfo: DeliveryPriceRequest): Promise<DeliveryPriceResponse> => {
    const { data } = await instance.get<Response<DeliveryPriceResponse>>(API_ORDER_EST, { params: deliveryInfo });
    return {
        deliveryPrice: data.data.deliveryPrice,
    };
};

export const createOrder = async (order: CreateOrderRequest): Promise<CreateOrderResponse> => {
    const { data } = await instance.post<Response<CreateOrderResponse>>(API_ORDER_CREATE, order, {});
    return {
        orderId: data.data.orderId,
    };
};
