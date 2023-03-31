import {
    API_REQUEST,
    API_REQUEST_APPROVE,
    API_REQUEST_DETAILS,
    API_REQUEST_REJECT
} from '../common/Constant';
import { CenterDetailsModel } from '../models/Center/CenterDetailsModel';
import { CenterModel } from '../models/Center/CenterModel';
import { CenterResponse } from '../models/Center/CenterResponse';
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
    const { data } = await instance.get<Response<CenterResponse>>(
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
        numOfRating: data.data.numOfRating,
        phone: data.data.phone,
        centerAddress: data.data.centerAddress,
        alias: data.data.alias,
        distance: data.data.distance,
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

export const approveCenter = async (id: number): Promise<CenterDetailsModel> => {
    const { data } = await instance.put<Response<CenterResponse>>(
        API_REQUEST_APPROVE.replace('${id}', id.toString()),
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
        numOfRating: data.data.numOfRating,
        phone: data.data.phone,
        centerAddress: data.data.centerAddress,
        alias: data.data.alias,
        distance: data.data.distance,
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

export const rejectCenter = async (id: number): Promise<CenterDetailsModel> => {
    const { data } = await instance.put<Response<CenterResponse>>(
        API_REQUEST_REJECT.replace('${id}', id.toString()),
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
        numOfRating: data.data.numOfRating,
        phone: data.data.phone,
        centerAddress: data.data.centerAddress,
        alias: data.data.alias,
        distance: data.data.distance,
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
