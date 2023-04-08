import { OperatingDay } from '../../types/OperatingDay';
import { ServiceTag } from '../../types/ServiceType/ServiceTag';

export interface CenterModel {
    id: number;
    thumbnail: string;
    title: string;
    alias: string;
    description?: string | React.ReactNode;
    service: ServiceTag[];
    rating: number;
    numOfRating: number;
    phone: string;
    address: string;
    distance: number;
    minPrice: number;
    maxPrice: number;
    monthOff: boolean;
    hasDelivery: boolean;
    hasOnlinePayment: boolean;
    isOpening: boolean;
    centerDeliveryPrices: [];
    location: {
        latitude: number;
        longitude: number;
    };
    centerOperatingHours: OperatingDay[];
}
