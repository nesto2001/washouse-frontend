import { ServicePricesModel } from './ServicePricesModel';

export type ServiceDetailsModel = {
    id: number;
    categoryId: number;
    name: string;
    description: string;
    image: string;
    priceType: boolean;
    price: number | null;
    minPrice: number;
    unit: string;
    rate: number;
    prices: ServicePricesModel[];
    timeEstimate: number;
    ratings: number[];
    rating: number | null;
    numOfRating: number;
};
