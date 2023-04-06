import { OperatingDay } from '../../types/OperatingDay';
import { CenterDeliveryPriceModel } from '../DeliveryPrice/DeliveryPriceModel';
import { LocationModel } from '../Location/LocationModel';

export type ManagerCenterModel = {
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
    monthOff: boolean;
    hasDelivery: boolean;
    centerDeliveryPrices: CenterDeliveryPriceModel[];
    centerLocation: LocationModel;
    centerOperatingHours: OperatingDay[];
    additionServices: [];
    centerGalleries: [];
    centerFeedbacks: [];
    centerResourses: [];
};