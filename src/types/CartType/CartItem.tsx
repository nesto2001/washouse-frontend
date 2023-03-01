export interface CartItem {
    id: number;
    name: string;
    thumbnail: string;
    price: number;
    weight?: number;
    quantity?: number;
    unit: 'kg' | 'pcs';
}
