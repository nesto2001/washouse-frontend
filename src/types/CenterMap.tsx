import { ServiceTag } from './ServiceType/ServiceTag';
import { TimeRange } from './TimeRange';

export interface CenterMap {
    id: number;
    thumbnail: string;
    title: string;
    service: ServiceTag[];
    additions: ServiceTag[];
    rating: number;
    numOfRating: number;
    location: {
        lat: number;
        lng: number;
    };
}
