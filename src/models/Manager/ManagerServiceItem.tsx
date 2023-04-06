import { ServicePricesModel } from '../Service/ServicePricesModel';

export type ManagerServiceItem = {
    id: number;
    name: string;
    categoryId: number;
    categoryName: string;
    priceType: boolean;
    price: number | null;
    minPrice: number | null;
    isAvailable: boolean;
    status: string;
    homeFlag: boolean;
    hotFlag: boolean;
    rating: number;
    numOfRating: number;
    prices: ServicePricesModel[];
};
