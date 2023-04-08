import { ServicePricesModel } from './ServicePricesModel';

export type CreateServiceRequest = {
    serviceName: string;
    alias: string;
    serviceCategory: number;
    serviceDescription: string;
    serviceImage: string;
    timeEstimate: number;
    unit: 'kg' | 'pcs';
    rate: number;
    priceType: true;
    price: number;
    minPrice: number;
    serviceGalleries: string[];
    prices: Array<{
        maxValue: number;
        price: number;
    }>;
};
