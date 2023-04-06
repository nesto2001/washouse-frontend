import { API_MANAGER_CENTER } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { CenterDeliveryPriceModel } from '../models/DeliveryPrice/DeliveryPriceModel';
import { ManagerCenterModel } from '../models/Manager/ManagerCenterModel';
import { ManagerCenterResponse } from '../models/Manager/ManagerCenterResponse';
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
