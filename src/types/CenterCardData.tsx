import { ServiceTag } from "./ServiceTag";

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
    operatingHours: {
        sunday: TimeRanges;
        monday: TimeRanges;
        tuesday: TimeRanges;
        wednesday: TimeRanges;
        thursday: TimeRanges;
        friday: TimeRanges;
        saturday: TimeRanges;
    }
}
