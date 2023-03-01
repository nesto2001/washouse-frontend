import { ServiceTag } from './ServiceType/ServiceTag';
import { TimeRange } from './TimeRange';

export interface CenterCardData {
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
}
