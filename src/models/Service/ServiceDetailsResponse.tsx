import { ServicePricesResponse } from './ServicePricesResponse';

export type ServiceDetailsResponse = {
    serviceId: number;
    categoryId: number;
    serviceName: string;
    description: string;
    image: string;
    priceType: boolean;
    price: number | null;
    minPrice: number;
    unit: string;
    rate: number;
    prices: ServicePricesResponse[];
    ratings: number[];
    timeEstimate: number;
    rating: number | null;
    numOfRating: number;
};
