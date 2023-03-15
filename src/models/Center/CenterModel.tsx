import { ServiceTag } from '../../types/ServiceType/ServiceTag';
import { TimeRange } from '../../types/TimeRange';

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
    operatingHours: Array<TimeRange>;
    alias: string;
    location: {
        latitude: number;
        longitude: number;
    };
}
