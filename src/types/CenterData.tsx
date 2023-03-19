import { OperatingDay } from './OperatingDay';
import { ServiceCategoryData } from './ServiceType/ServiceCategoryData';

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
    operatingHours: Array<OperatingDay>;
}
