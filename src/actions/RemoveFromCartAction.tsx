import { REMOVE_FROM_CART } from './ActionTypes';

export interface RemoveFromCartAction {
    type: typeof REMOVE_FROM_CART;
    payload: number;
}
