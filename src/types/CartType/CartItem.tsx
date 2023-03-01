export interface CartItem {
    id: number;
    name: string;
    price: number;
    weight?: number;
    quantity?: number;
    unit: 'kg' | 'pcs';
}
