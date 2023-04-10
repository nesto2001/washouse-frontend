import {
    API_ORDER_CREATE,
    API_ORDER_DELIVERY,
    API_ORDER_EST,
    API_ORDER_SEARCH,
    API_REGISTER_CUSTOMER,
} from '../common/Constant';
import { Response } from '../models/CommonModel';
import { CustomerOrderDetailsModel } from '../models/Customer/CustomerOrderDetailsModel';
import { CustomerOrderDetailsReponse } from '../models/Customer/CustomerOrderDetailsResponse';
import { LoginResponse } from '../models/LoginResponse';
import { CreateOrderRequest } from '../models/Order/CreateOrderRequest';
import { CreateOrderResponse } from '../models/Order/CreateOrderResponse';
import { DeliveryPriceRequest } from '../models/Order/DeliveryPriceRequest';
import { DeliveryPriceResponse } from '../models/Order/DeliveryPriceResponse';
import { EstimatedTimeModel } from '../models/Order/EstimatedTimeModel';
import { EstimatedTimeResponse } from '../models/Order/EstimatedTimeResponse';
import { CenterOrderDeliveryModel } from '../models/Staff/CenterOrderDeliveryModel';
import { CenterOrderDetailsModel } from '../models/Staff/CenterOrderDetailsModel';
import { CenterOrderDetailsReponse } from '../models/Staff/CenterOrderDetailsResponse';
import { CenterOrderTrackingModel } from '../models/Staff/CenterOrderTrackingModel';
import { CenterOrderedServiceModel } from '../models/Staff/CenterOrderedServiceModel';
import instance from '../services/axios/AxiosInstance';
import { CartItem } from '../types/CartType/CartItem';

export const getEstimateTime = async (cartItems: CartItem[]): Promise<EstimatedTimeModel> => {
    const response = await instance.post<Response<EstimatedTimeResponse>>(API_ORDER_EST, cartItems, {});
    return {
        estimated: response.data.data.totalEstimatedTime,
    };
};

export const calcDeliveryPrice = async (deliveryInfo: DeliveryPriceRequest): Promise<DeliveryPriceResponse> => {
    const { data } = await instance.get<Response<DeliveryPriceResponse>>(API_ORDER_DELIVERY, { params: deliveryInfo });
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

export const getOrderDetails = async (orderId: string, phone: string): Promise<CustomerOrderDetailsModel> => {
    const { data } = await instance.get<Response<CustomerOrderDetailsReponse>>(API_ORDER_SEARCH, {
        params: { OrderId: orderId, Phone: phone },
    });
    if (data === null) {
        throw new Error();
    }
    return {
        id: data.data.id,
        customerName: data.data.customerName,
        customerEmail: data.data.customerEmail,
        customerMessage: data.data.customerMessage,
        customerMobile: data.data.customerMobile,
        customerOrdered: data.data.customerOrdered,
        deliveryPrice: data.data.deliveryPrice,
        deliveryType: data.data.deliveryType,
        locationId: data.data.locationId,
        preferredDropoffTime: data.data.preferredDropoffTime,
        preferredDeliverTime: data.data.preferredDeliverTime,
        totalOrderValue: data.data.totalOrderValue,
        status: data.data.status,
        orderDeliveries: data.data.orderDeliveries.map((delivery): CenterOrderDeliveryModel => {
            return {
                shipperName: delivery.shipperName,
                shipperPhone: delivery.shipperPhone,
                date: delivery.deliveryDate,
                estimated: delivery.estimatedTime,
                locationId: delivery.locationId,
                status: delivery.status,
                type: delivery.deliveryType,
            };
        }),
        orderPayment: {
            total: data.data.orderPayment.paymentTotal,
            platformFee: data.data.orderPayment.paymentMethod,
            promoCode: data.data.orderPayment.promoCode,
            discount: data.data.orderPayment.discount,
            status: data.data.orderPayment.status,
            createdDate: data.data.orderPayment.createdDate,
            dateIssue: data.data.orderPayment.dateIssue,
            method: data.data.orderPayment.paymentMethod,
            updatedDate: data.data.orderPayment.updatedDate,
        },
        orderTrackings: data.data.orderTrackings.map((tracking): CenterOrderTrackingModel => {
            return {
                status: tracking.status,
                createdDate: tracking.createdDate,
                updatedDate: tracking.updatedDate,
            };
        }),
        orderedDetails: data.data.orderedDetails.map((ordered): CenterOrderedServiceModel => {
            return {
                name: ordered.serviceName,
                category: ordered.serviceCategory,
                measurement: ordered.measurement,
                customerNote: ordered.customerNote,
                id: ordered.orderDetailId,
                image: ordered.image,
                orderDetailTrackings: ordered.orderDetailTrackings,
                staffNote: ordered.staffNote,
                status: ordered.status,
                price: ordered.price,
                unit: ordered.unit,
            };
        }),
        center: data.data.center,
    };
};
