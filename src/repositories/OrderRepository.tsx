import { API_ORDER_CREATE, API_ORDER_EST, API_REGISTER_CUSTOMER } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { LoginResponse } from '../models/LoginResponse';
import { CreateOrderRequest } from '../models/Order/CreateOrderRequest';
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

export const createOrder = async (order: CreateOrderRequest) => {
    const response = await instance.post<Response<Number>>(API_ORDER_CREATE, order, {});
    return response;
};
