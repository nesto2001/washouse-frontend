import { CenterDeliveryPriceResponse } from '../DeliveryPrice/DeliveryPriceResponse';
import { LocationResponse } from '../Location/LocationResponse';
import { OperatingHoursResponse } from '../OperatingHours/OperatingHoursResponse';

export type ManagerCenterResponse = {
    id: number;
    thumbnail: string;
    title: string;
    alias: string;
    description: string;
    rating: number;
    numOfRating: number;
    phone: string;
    centerAddress: string;
    isAvailable: boolean;
    status: string;
    taxCode: string;
    taxRegistrationImage: string;
    monthOff: false;
    hasDelivery: boolean;
    centerDeliveryPrices: CenterDeliveryPriceResponse[];
    centerLocation: LocationResponse;
    centerOperatingHours: OperatingHoursResponse[];
    additionServices: [];
    centerGalleries: [];
    centerFeedbacks: [];
    centerResourses: [];
};
