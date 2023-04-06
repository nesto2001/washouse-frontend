import { API_MANAGER_CENTER, API_MANAGER_CENTER_ORDER, API_MANAGER_CENTER_SERVICE } from '../common/Constant';
import { ListResponse } from '../models/CommonModel';
import { PaginationResponse, Response } from '../models/CommonModel';
import { CenterDeliveryPriceModel } from '../models/DeliveryPrice/DeliveryPriceModel';
import { ManagerCenterModel } from '../models/Manager/ManagerCenterModel';
import { ManagerCenterResponse } from '../models/Manager/ManagerCenterResponse';
import { ManagerServiceItem } from '../models/Manager/ManagerServiceItem';
import { ManagerServiceResponse } from '../models/Manager/ManagerServiceResponse';
import { CenterOrderModel } from '../models/Staff/CenterOrderModel';
import { CenterOrderResponse } from '../models/Staff/CenterOrderResponse';
import instance from '../services/axios/AxiosInstance';
import { OperatingDay } from '../types/OperatingDay';

export const getManagerCenter = async (): Promise<ManagerCenterModel> => {
    const { data } = await instance.get<Response<ManagerCenterResponse>>(API_MANAGER_CENTER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (data === null) {
        throw new Error();
    }
    return {
        id: data.data.id,
        additionServices: [],
        alias: data.data.alias,
        centerAddress: data.data.centerAddress,
        centerDeliveryPrices: data.data.centerDeliveryPrices.map((deliPrice): CenterDeliveryPriceModel => {
            return {
                maxDistance: deliPrice.maxDistance,
                maxWeight: deliPrice.maxWeight,
                price: deliPrice.price,
            };
        }),
        centerFeedbacks: data.data.centerFeedbacks,
        centerGalleries: data.data.centerGalleries,
        centerLocation: data.data.centerLocation,
        centerOperatingHours: data.data.centerOperatingHours.map((day): OperatingDay => {
            return {
                day: day.day,
                start: day.openTime,
                end: day.closeTime,
            };
        }),
        centerResourses: data.data.centerResourses,
        description: data.data.description,
        hasDelivery: data.data.hasDelivery,
        isAvailable: data.data.isAvailable,
        locationId: data.data.locationId,
        monthOff: data.data.monthOff,
        numOfRating: data.data.numOfRating,
        phone: data.data.phone,
        rating: data.data.rating,
        status: data.data.status,
        taxCode: data.data.taxCode,
        taxRegistrationImage: data.data.taxRegistrationImage,
        thumbnail: data.data.thumbnail,
        title: data.data.title,
    };
};

export const getManagerCenterOrders = async (): Promise<CenterOrderModel[]> => {
    const { data } = await instance.get<PaginationResponse<CenterOrderResponse>>(API_MANAGER_CENTER_ORDER, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (data === null) {
        throw new Error();
    }
    return data.data.items.map((item): CenterOrderModel => {
        return {
            id: item.orderId,
            customerName: item.customerName,
            discount: item.discount,
            orderedDate: item.orderDate,
            status: item.status,
            totalPayment: item.totalOrderPayment,
            totalValue: item.totalOrderValue,
        };
    });
};

export const getManagerServices = async (): Promise<ManagerServiceItem[]> => {
    const { data } = await instance.get<ListResponse<ManagerServiceResponse>>(API_MANAGER_CENTER_SERVICE, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (data === null) {
        throw new Error();
    }
    return data.data.map((item): ManagerServiceItem => {
        return {
            id: item.serviceId,
            categoryId: item.categoryId,
            categoryName: item.serviceName,
            homeFlag: item.homeFlag,
            hotFlag: item.hotFlag,
            isAvailable: item.isAvailable,
            minPrice: item.minPrice,
            name: item.serviceName,
            numOfRating: item.numOfRating,
            price: item.price,
            prices: item.prices.map((price) => {
                return {
                    maxValue: price.maxValue,
                    price: price.price,
                };
            }),
            priceType: item.priceType,
            rating: item.rating,
            status: item.status,
        };
    });
};
