import { API_SERVICE_DETAILS } from '../common/Constant';
import { Response } from '../models/CommonModel';
import { ServiceDetailsModel } from '../models/Service/ServiceDetailsModel';
import { ServiceDetailsResponse } from '../models/Service/ServiceDetailsResponse';
import { ServicePricesModel } from '../models/Service/ServicePricesModel';
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
