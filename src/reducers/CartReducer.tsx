import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../types/CartType/CartItem';
import { CartState } from '../types/CartType/CartState';
type Props = {};

const initialState: CartState = {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const CartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            if (!item) {
                return state;
            }
            const existingItem = state.items.find((i) => i.id === item.id && i.unit === item.unit);

            if (existingItem) {
                if (item.unit === 'kg' && item.weight && existingItem.weight) {
                    existingItem.weight += item.weight;
                } else {
                    if (existingItem.quantity && item.quantity) existingItem.quantity += item.quantity;
                }
            } else {
                state.items.push(item);
            }
            state.totalQuantity += item.quantity ?? 1;
            state.totalPrice += item.price * (item.quantity ?? 1);
        },
        removeItem: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            if (!item) {
                return state;
            }
            const index = state.items.findIndex((i) => i.id === item.id && i.unit === item.unit);

            if (index >= 0) {
                const itemToRemove = state.items[index];
                state.totalQuantity -= itemToRemove.quantity ?? 1;
                state.totalPrice -= itemToRemove.price * (itemToRemove.quantity ?? 1);

                state.items.splice(index, 1);
            }
        },
    },
});

export const { addItem, removeItem } = CartReducer.actions;

export default CartReducer.reducer;
