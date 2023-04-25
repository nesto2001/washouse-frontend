import { List } from 'reselect/es/types';
import { CenterModel } from '../models/Center/CenterModel';
import { CenterResponse } from '../models/Center/CenterResponse';
import instance from '../services/axios/AxiosInstance';
import { ServiceTag } from '../types/ServiceType/ServiceTag';
import { OperatingDay } from '../types/OperatingDay';
import { ServiceModel } from '../models/Service/ServiceModel';
import { ServiceCategoryModel } from '../models/Service/ServiceCategoryModel';
import { CenterDetailsModel } from '../models/Center/CenterDetailsModel';
import { PaginationResponse, Response } from '../models/CommonModel';
import { LoginResponse } from '../models/LoginResponse';
import { API_CENTER, API_CENTER_DETAILS } from '../common/Constant';
import { CenterRequest } from '../models/Center/CreateCenterRequest';
import { CreateCenterResponse } from '../models/Center/CreateCenterResponse';
import { CenterDetailsResponse } from '../models/Center/CenterDetailsResponse';

export const getAllCenter = async ({
    lat,
    long,
    searchString,
    categoryServices,
    budgetRange,
    sort,
    hasOnlinePayment,
    hasDelivery,
}: {
    lat?: number;
    long?: number;
    searchString?: string;
    categoryServices?: string;
    budgetRange?: string;
    sort: string;
    hasOnlinePayment?: boolean;
    hasDelivery?: boolean;
}): Promise<CenterModel[]> => {
    const { data } = await instance.get<PaginationResponse<CenterResponse>>(API_CENTER, {
        params: {
            CurrentUserLatitude: lat,
            CurrentUserLongitude: long,
            Sort: sort,
            BudgetRange: budgetRange,
            CategoryServices: categoryServices,
            SearchString: searchString,
            HasOnlinePayment: hasOnlinePayment,
            HasDelivery: hasDelivery,
        },
    });
    return data.data.items.map((item): CenterModel => {
        return {
            id: item.id,
            thumbnail: item.thumbnail,
            title: item.title,
            description: item.description,
            service: item.centerServices.map((service): ServiceTag => {
                return {
                    id: service.serviceCategoryID,
                    title: service.serviceCategoryName,
                };
            }),
            rating: item.rating,
            numOfRating: item.numOfRating,
            phone: item.phone,
            address: item.centerAddress,
            centerDeliveryPrices: [],
            hasDelivery: item.hasDelivery,
            hasOnlinePayment: item.hasOnlinePayment,
            isOpening: item.isOpening,
            maxPrice: item.maxPrice,
            minPrice: item.minPrice,
            monthOff: item.monthOff,
            alias: item.alias,
            distance: item.distance,
            location: item.centerLocation,
            centerOperatingHours: item.centerOperatingHours.map((day): OperatingDay => {
                return {
                    day: day.day,
                    start: day.openTime,
                    end: day.closeTime,
                };
            }),
        };
    });
};
export const getCenter = async (id: number): Promise<CenterDetailsModel> => {
    const { data } = await instance.get<Response<CenterDetailsResponse>>(
        API_CENTER_DETAILS.replace('${id}', id.toString()),
        {},
    );
    return {
        id: data.data.id,
        thumbnail: data.data.thumbnail,
        title: data.data.title,
        description: data.data.description,
        service: data.data.centerServices.map((serviceCategory): ServiceCategoryModel => {
            return {
                categoryID: serviceCategory.serviceCategoryID,
                categoryName: serviceCategory.serviceCategoryName,
                services: serviceCategory.services.map((service): ServiceModel => {
                    return {
                        id: service.serviceId,
                        categoryId: service.categoryId,
                        description: service.description,
                        image: service.image,
                        name: service.serviceName,
                        numOfRating: service.numOfRating,
                        price: service.price,
                        rating: service.rating,
                        timeEstimate: service.timeEstimate,
                        minPrice: service.minPrice,
                    };
                }),
            };
        }),
        rating: data.data.rating,
        ratings: data.data.ratings,
        numOfRating: data.data.numOfRating,
        phone: data.data.phone,
        centerAddress: data.data.centerAddress,
        alias: data.data.alias,
        distance: data.data.distance,
        hasDelivery: data.data.hasDelivery,
        minPrice: data.data.minPrice,
        maxPrice: data.data.maxPrice,
        centerDeliveryPrices: [],
        centerLocation: data.data.centerLocation,
        operatingHours: data.data.centerOperatingHours.map((day): OperatingDay => {
            return {
                day: day.day,
                start: day.openTime,
                end: day.closeTime,
            };
        }),
    };
};

export const getCenterBrief = async (id: number): Promise<CenterModel> => {
    const { data } = await instance.get<Response<CenterResponse>>(
        API_CENTER_DETAILS.replace('${id}', id.toString()),
        {},
    );
    return {
        id: data.data.id,
        thumbnail: data.data.thumbnail,
        title: data.data.title,
        description: data.data.description,
        service: data.data.centerServices.map((serviceCategory): ServiceTag => {
            return {
                id: serviceCategory.serviceCategoryID,
                title: serviceCategory.serviceCategoryName,
            };
        }),
        rating: data.data.rating,
        numOfRating: data.data.numOfRating,
        phone: data.data.phone,
        location: {
            latitude: data.data.centerLocation.latitude,
            longitude: data.data.centerLocation.longitude,
        },
        alias: data.data.alias,
        distance: data.data.distance,
        centerDeliveryPrices: [],
        hasDelivery: data.data.hasDelivery,
        hasOnlinePayment: data.data.hasOnlinePayment,
        isOpening: data.data.isOpening,
        maxPrice: data.data.maxPrice,
        minPrice: data.data.minPrice,
        monthOff: data.data.monthOff,
        address: data.data.centerAddress,
        centerOperatingHours: data.data.centerOperatingHours.map((day): OperatingDay => {
            return {
                day: day.day,
                start: day.openTime,
                end: day.closeTime,
            };
        }),
    };
};

export const createCenter = async (center: CenterRequest): Promise<Response<CreateCenterResponse>> => {
    const response = await instance.post<Response<CreateCenterResponse>>(API_CENTER, center, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    return response.data;
};
