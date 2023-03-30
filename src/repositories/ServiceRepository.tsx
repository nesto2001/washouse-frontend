import { API_SERVICE_DETAILS } from '../common/Constant';
import { ServiceDetailsModel } from '../models/Service/ServiceDetailsModel';
import { ServiceDetailsResponse } from '../models/Service/ServiceDetailsResponse';
import instance from '../services/axios/AxiosInstance';

export const getService = async (id: number): Promise<ServiceDetailsModel> => {
    const { data } = await instance.get<ServiceDetailsResponse>(API_SERVICE_DETAILS.replace('${id}', id.toString()), {
        params: { id: id },
    });
    return {
        id: data.id,
        image: data.image,
        serviceName: data.serviceName,
        categoryId: data.categoryId,
        isAvailable: data.isAvailable,
        centerId: data.centerId,
        price: data.price,
        timeEstimate: data.timeEstimate,
        rating: data.rating,
        numOfRating: data.numOfRating,
        alias: data.alias,
        priceType: data.priceType,
        description: data.description,
        minPrice: data.minPrice,
        rate: data.rate,
        servicePrices: data.servicePrices.map((prices) => {
            return {
                id: prices.id,
                maxValue: prices.maxValue,
                price: prices.price,
            };
        }),
    };
};
