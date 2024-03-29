import { ServicePricesResponse } from "./ServicePricesResponse";

export type ServiceResponse = {
    serviceId: number;
    categoryId: number;
    serviceName: string;
    description: string;
    image: string;
    price: number;
    timeEstimate: number;
    rating: number;
    numOfRating: number;
    priceType: boolean;
    minPrice: number;
    prices: ServicePricesResponse[];
};
