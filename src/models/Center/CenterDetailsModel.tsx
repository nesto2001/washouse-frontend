import { OperatingDay } from '../../types/OperatingDay';
import { ServiceCategoryModel } from '../Service/ServiceCategoryModel';

export interface CenterDetailsModel {
    id: number;
    thumbnail: string;
    title: string;
    alias: string;
    description: string;
    service: ServiceCategoryModel[];
    rating: number;
    numOfRating: number;
    phone: string;
    centerAddress: string;
    distance: number;
    minPrice?: number;
    maxPrice?: number;
    monthOff?: boolean;
    hasDelivery: boolean;
    centerDeliveryPrices?: [];
    centerLocation: {
        latitude: number;
        longitude: number;
    };
    operatingHours: OperatingDay[];
}
