import { ServicePricesResponse } from '../Service/ServicePricesResponse';

export type ManagerServiceResponse = {
    serviceId: number;
    serviceName: string;
    alias: string;
    categoryId: number;
    categoryName: string;
    description: string;
    priceType: boolean;
    image: string;
    price: number | null;
    minPrice: number | null;
    unit: string;
    rate: number;
    timeEstimate: number;
    isAvailable: boolean;
    status: string;
    homeFlag: boolean;
    hotFlag: boolean;
    rating: number;
    numOfRating: number;
    ratings: number[];
    prices: ServicePricesResponse[] | [];
};
