import { OperatingDay } from '../../types/OperatingDay';
import { ServiceTag } from '../../types/ServiceType/ServiceTag';

export interface CenterModel {
    id: number;
    thumbnail: string;
    title: string;
    description?: string | React.ReactNode;
    service: ServiceTag[];
    additions: ServiceTag[];
    rating: number;
    numOfRating: number;
    phone: string;
    address: string;
    alias: string;
    distance: number;
    location: {
        latitude: number;
        longitude: number;
    };
    centerOperatingHours: OperatingDay[];
}
