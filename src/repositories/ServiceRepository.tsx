import {
    API_CENTER_SERVICES,
    API_MANAGER_CENTER_SERVICE,
    API_SERVICES,
    API_SERVICES_CENTER,
    API_SERVICE_DETAILS,
    API_SERVICE_DETAILS_ID,
} from '../common/Constant';
import { Response } from '../models/CommonModel';
import { CreateServiceRequest } from '../models/Service/CreateServiceRequest';
import { ServiceDetailsModel } from '../models/Service/ServiceDetailsModel';
import { ServiceDetailsResponse } from '../models/Service/ServiceDetailsResponse';
import { ServicePricesModel } from '../models/Service/ServicePricesModel';
import { UpdateServiceRequest } from '../models/Service/UpdateServiceRequest';
import instance from '../services/axios/AxiosInstance';

export const getService = async (centerId: number, id: number): Promise<ServiceDetailsModel> => {
    const { data } = await instance.get<Response<ServiceDetailsResponse>>(
        API_SERVICE_DETAILS.replace('${centerId}', centerId.toString()).replace('${serviceId}', id.toString()),
        {
            params: { id: id },
        },
    );
    return {
        id: data.data.serviceId,
        categoryId: data.data.categoryId,
        name: data.data.serviceName,
        description: data.data.description,
        image: data.data.image,
        priceType: data.data.priceType,
        price: data.data.price,
        minPrice: data.data.minPrice,
        unit: data.data.unit,
        rate: data.data.rate,
        ratings: data.data.ratings,
        prices: data.data.prices.map((price): ServicePricesModel => {
            return {
                maxValue: price.maxValue,
                price: price.price,
            };
        }),
        timeEstimate: data.data.timeEstimate,
        rating: data.data.rating,
        numOfRating: data.data.numOfRating,
    };
};

export const getServices = async (centerId: number): Promise<ServiceDetailsModel[]> => {
    const { data } = await instance.get<Response<ServiceDetailsResponse[]>>(
        API_SERVICES_CENTER.replace('${centerId}', centerId.toString()),
    );
    return data.data.map((service) => {
        return {
            id: service.serviceId,
            categoryId: service.categoryId,
            name: service.serviceName,
            description: service.description,
            image: service.image,
            priceType: service.priceType,
            price: service.price,
            minPrice: service.minPrice,
            unit: service.unit,
            rate: service.rate,
            ratings: service.ratings,
            prices: service.prices.map((price): ServicePricesModel => {
                return {
                    maxValue: price.maxValue,
                    price: price.price,
                };
            }),
            timeEstimate: service.timeEstimate,
            rating: service.rating,
            numOfRating: service.numOfRating,
        };
    });
};

export const createService = async (request: CreateServiceRequest) => {
    const { status } = await instance.post(API_MANAGER_CENTER_SERVICE, request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status != 200) {
        throw new Error();
    }
    return status;
};
export const getServiceDetail = async (id: number): Promise<ServiceDetailsModel> => {
    const { data } = await instance.get<Response<ServiceDetailsResponse>>(
        API_SERVICE_DETAILS_ID.replace('${id}', id.toString()),
        {
            params: { id: id },
        },
    );
    return {
        id: data.data.serviceId,
        categoryId: data.data.categoryId,
        name: data.data.serviceName,
        description: data.data.description,
        image: data.data.image,
        priceType: data.data.priceType,
        price: data.data.price,
        minPrice: data.data.minPrice,
        unit: data.data.unit,
        rate: data.data.rate,
        ratings: data.data.ratings,
        prices: data.data.prices.map((price): ServicePricesModel => {
            return {
                maxValue: price.maxValue,
                price: price.price,
            };
        }),
        timeEstimate: data.data.timeEstimate,
        rating: data.data.rating,
        numOfRating: data.data.numOfRating,
    };
};

export const updateService = async (id: number, request: UpdateServiceRequest) => {
    const { status } = await instance.put(API_SERVICE_DETAILS_ID.replace('${id}', id.toString()), request, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
    if (status != 200) {
        throw new Error();
    }
    return status;
};
