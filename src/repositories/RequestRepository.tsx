import {
    API_REQUEST,
    API_REQUEST_APPROVE,
    API_REQUEST_APPROVE_UPDATE,
    API_REQUEST_DETAILS,
    API_REQUEST_REJECT,
    API_REQUEST_REJECT_UPDATE,
} from '../common/Constant';
import { CenterDetailsModel } from '../models/Center/CenterDetailsModel';
import { CenterDetailsResponse } from '../models/Center/CenterDetailsResponse';
import { CenterModel } from '../models/Center/CenterModel';
import { CenterResponse } from '../models/Center/CenterResponse';
import { ReviewCenterModel } from '../models/Center/ReviewCenterModel';
import { ReviewCenterResponse } from '../models/Center/ReviewCenterResponse';
import { PaginationResponse, Response } from '../models/CommonModel';
import { ServiceCategoryModel } from '../models/Service/ServiceCategoryModel';
import { ServiceModel } from '../models/Service/ServiceModel';
import instance from '../services/axios/AxiosInstance';
import { OperatingDay } from '../types/OperatingDay';
import { ServiceTag } from '../types/ServiceType/ServiceTag';

export const getCenterRequests = async ({
    lat,
    long,
    searchString,
    categoryServices,
    budgetRange,
    sort,
}: {
    lat?: number;
    long?: number;
    searchString?: string;
    categoryServices?: string;
    budgetRange?: string;
    sort?: string;
}): Promise<CenterModel[]> => {
    const { data } = await instance.get<PaginationResponse<CenterResponse>>(API_REQUEST, {
        params: {
            CurrentUserLatitude: lat,
            CurrentUserLongitude: long,
            Sort: sort,
            BudgetRange: budgetRange,
            CategoryServices: categoryServices,
            SearchString: searchString,
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
            alias: item.alias,
            distance: item.distance,
            centerDeliveryPrices: [],
            hasDelivery: item.hasDelivery,
            hasOnlinePayment: item.hasOnlinePayment,
            isOpening: item.isOpening,
            maxPrice: item.maxPrice,
            minPrice: item.minPrice,
            monthOff: item.monthOff,
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

export const getCenterRequest = async (id: number): Promise<CenterDetailsModel> => {
    const { data } = await instance.get<Response<CenterDetailsResponse>>(
        API_REQUEST_DETAILS.replace('${id}', id.toString()),
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

export const approveCenter = async (id: number): Promise<ReviewCenterModel> => {
    const { data } = await instance.put<Response<ReviewCenterResponse>>(
        API_REQUEST_APPROVE.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return {
        centerId: data.data.centerId,
    };
};

export const rejectCenter = async (id: number): Promise<ReviewCenterModel> => {
    const { data } = await instance.put<Response<ReviewCenterResponse>>(
        API_REQUEST_REJECT.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return {
        centerId: data.data.centerId,
    };
};

export const approveCenterUpdate = async (id: number): Promise<ReviewCenterModel> => {
    const { data } = await instance.put<Response<ReviewCenterResponse>>(
        API_REQUEST_APPROVE_UPDATE.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return {
        centerId: data.data.centerId,
    };
};

export const rejectCenterUpdate = async (id: number): Promise<ReviewCenterModel> => {
    const { data } = await instance.put<Response<ReviewCenterResponse>>(
        API_REQUEST_REJECT_UPDATE.replace('${id}', id.toString()),
        {},
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            },
        },
    );
    return {
        centerId: data.data.centerId,
    };
};
