import { PriceRange } from './PriceRange';

export interface SubService {
    id: number;
    thumbnail: string;
    title: string;
    description?: string | React.ReactNode;
    minTime: number;
    maxTime: number;
    rating: number;
    priceChart: Array<PriceRange>;
}
