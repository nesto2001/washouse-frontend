import { ServicePriceModel } from '../../models/Service/ServicePricesModel';
import { PriceRange } from '../PriceRange';

export interface CartItem {
    id: number;
    centerId: number;
    name: string;
    thumbnail: string;
    price: number;
    weight?: number;
    quantity?: number;
    minPrice?: number;
    priceChart?: ServicePriceModel[];
    unit: 'kg' | 'pcs';
}
