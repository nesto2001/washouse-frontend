import { ServicePriceModel } from './ServicePricesModel';

export type ServiceDetailsModel = {
    id: number;
    serviceName: string;
    alias: string;
    categoryId: number;
    description: string;
    minPrice?: number;
    rate: number;
    priceType: boolean;
    image: string;
    price: number;
    timeEstimate: number;
    isAvailable: boolean;
    rating: number;
    numOfRating: number;
    centerId: number;
    serviceGalleries?: [];
    servicePrices?: ServicePriceModel[];
};
