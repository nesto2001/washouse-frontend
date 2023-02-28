import { ServiceCategoryData } from './ServiceCategoryData';
import { ServiceTag } from './ServiceTag';
import { TimeRange } from './TimeRange';

export interface CenterData {
    id: number;
    thumbnail: string;
    title: string;
    description?: string | React.ReactNode;
    service: ServiceCategoryData[];
    additions?: ServiceCategoryData[];
    rating: number;
    numOfRating: number;
    phone: string;
    address: string;
    operatingHours: Array<TimeRange>;
}
