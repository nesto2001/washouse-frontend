import { PriceRange } from "../PriceRange";

export interface CartItem {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    weight?: number;
    quantity?: number;
    priceChart?: Array<PriceRange>;
    unit: 'kg' | 'pcs';
}
