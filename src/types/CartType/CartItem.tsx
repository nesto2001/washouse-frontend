import { ServicePricesModel } from '../../models/Service/ServicePricesModel';

export interface CartItem {
    id: number;
    centerId: number;
    name: string;
    thumbnail: string;
    price?: number;
    unitPrice: number;
    weight?: number;
    quantity?: number | null;
    minPrice?: number;
    priceChart?: ServicePricesModel[];
    unit: 'kg' | 'pcs';
}
