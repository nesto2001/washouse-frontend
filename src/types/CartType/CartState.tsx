import { CartItem } from './CartItem';

export interface CartState {
    items: CartItem[];
    totalPrice: number;
    totalQuantity: number;
    totalWeight: number;
    centerId: number;
}
