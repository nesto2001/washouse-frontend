import { ServicePricesResponse } from '../../Service/ServicePricesResponse';

export type CenterServiceResponse = {
    serviceId: number;
    categoryId: number;
    serviceName: string;
    priceType: boolean;
    price: number;
    minPrice?: number;
    unit: string;
    rate: number;
    prices: ServicePricesResponse[];
    timeEstimate: number;
};
