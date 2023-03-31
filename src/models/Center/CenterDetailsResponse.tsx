import { OperatingDay } from '../../types/OperatingDay';
import { OperatingHoursResponse } from '../OperatingHours/OperatingHoursResponse';
import { ServiceCategoryResponse } from '../Service/ServiceCategoryResponse';

export type CenterDetailsResponse = {
    id: number;
    thumbnail: string;
    title: string;
    alias: string;
    description: string;
    centerServices: ServiceCategoryResponse[];
    rating: number;
    numOfRating: number;
    phone: string;
    centerAddress: string;
    distance: number;
    minPrice: number;
    maxPrice: number;
    monthOff: boolean;
    hasDelivery: boolean;
    centerDeliveryPrices: [];
    centerLocation: {
        latitude: number;
        longitude: number;
    };
    centerOperatingHours: OperatingHoursResponse[];
};
