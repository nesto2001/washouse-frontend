import { ServicePricesModel } from '../Service/ServicePricesModel';

export type ManagerServiceModel = {
    serviceId: number;
    serviceName: string;
    alias: string;
    categoryId: number;
    description: string;
    priceType: boolean;
    image: string;
    price: number;
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
    prices: ServicePricesModel[];
};
