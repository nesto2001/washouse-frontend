import { ServicePricesModel } from "../../Service/ServicePricesModel";

export type AdminCenterServiceModel = {
    serviceId: number;
    serviceName: string;
    alias: string;
    categoryId: number;
    categoryName: string;
    priceType: boolean;
    price: number;
    minPrice: number;
    unit: string;
    rate: number;
    isAvailable: boolean;
    status: string;
    rating: number;
    numOfRating: number;
    prices: ServicePricesModel[];
};
