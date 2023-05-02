import { ServicePricesModel } from '../../Service/ServicePricesModel';

export type CenterServiceModel = {
    serviceId: number;
    categoryId: number;
    serviceName: string;
    priceType: false;
    price: number;
    minPrice?: number;
    unit: string;
    rate: number;
    prices: ServicePricesModel[];
    timeEstimate: number;
};
