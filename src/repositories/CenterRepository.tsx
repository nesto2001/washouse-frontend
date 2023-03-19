import { List } from 'reselect/es/types';
import { CenterModel } from '../models/Center/CenterModel';
import { CenterResponse } from '../models/Center/CenterResponse';
import instance from '../services/axios/AxiosInstance';
import { ServiceTag } from '../types/ServiceType/ServiceTag';
import { OperatingDay } from '../types/OperatingDay';
import { ServiceModel } from '../models/Service/ServiceModel';
import { ServiceCategoryModel } from '../models/Service/ServiceCategoryModel';
import { CenterDetailsModel } from '../models/Center/CenterDetailsModel';

export const getAllCenter = async ({ lat, long }: { lat?: number; long?: number }): Promise<CenterModel[]> => {
    const { data } = await instance.get<List<CenterResponse>>('/api/center/getAll', {
        params: {
            UserLatitude: lat,
            UserLongitude: long,
        },
    });
    return data.map((item): CenterModel => {
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
            additions: [],
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

export const getCenter = async (id: number): Promise<CenterDetailsModel> => {
    const { data } = await instance.get<CenterResponse>(`/api/center/${id}`, {});
    return {
        id: data.id,
        thumbnail: data.thumbnail,
        title: data.title,
        description: data.description,
        service: data.centerServices.map((serviceCategory): ServiceCategoryModel => {
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
        rating: data.rating,
        numOfRating: data.numOfRating,
        phone: data.phone,
        centerAddress: data.centerAddress,
        alias: data.alias,
        distance: data.distance,
        centerLocation: data.centerLocation,
        operatingHours: data.centerOperatingHours.map((day): OperatingDay => {
            return {
                day: day.day,
                start: day.openTime,
                end: day.closeTime,
            };
        }),
    };
};
