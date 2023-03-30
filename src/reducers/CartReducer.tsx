import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Modal } from 'antd';
import { getService } from '../repositories/ServiceRepository';
import { CartItem } from '../types/CartType/CartItem';
import { CartState } from '../types/CartType/CartState';
import { calculatePrice } from '../utils/CommonUtils';
type Props = {};

const cartJson = localStorage.getItem('userCart');

const emptyState: CartState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    centerId: 0,
};

const initialState: CartState = cartJson
    ? JSON.parse(cartJson)
    : {
          items: [],
          totalQuantity: 0,
          totalPrice: 0,
          centerId: null,
          ...JSON.parse(localStorage.getItem('userCart') || '{}'),
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
            if (!state.centerId) {
                state.centerId = item.centerId;
            }
            const existingItem = state.items.find((i) => i.id === item.id && i.unit === item.unit);

            if (existingItem) {
                if (item.unit === 'kg' && item.weight && existingItem.weight) {
                    const updatedItem = { ...existingItem };
                    if (updatedItem.weight) {
                        updatedItem.weight += item.weight;
                    }
                    const fetchData = async () => {
                        return await getService(item.id);
                    };
                    fetchData().then((res) => {
                        if (updatedItem.weight && updatedItem.weight > 0)
                            updatedItem.price = calculatePrice(res, updatedItem.weight);
                    });
                } else {
                    if (existingItem.quantity && item.quantity) existingItem.quantity += item.quantity;
                }
            } else {
                state.items.push(item);
            }
            state.totalQuantity += item.quantity ?? 1;
            state.totalPrice += item.price * (item.quantity ?? 1);
            localStorage.setItem('userCart', JSON.stringify(state));
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            if (!itemId) {
                return state;
            }
            const index = state.items.findIndex((i) => i.id === itemId);

            if (index >= 0) {
                const itemToRemove = state.items[index];
                state.totalQuantity -= itemToRemove.quantity ?? 1;
                state.totalPrice -= itemToRemove.price * (itemToRemove.quantity ?? 1);

                state.items.splice(index, 1);
            }
            localStorage.setItem('userCart', JSON.stringify(state));
        },
        clearCart: (state) => {
            state = emptyState;
            console.log(initialState);
            localStorage.setItem('userCart', JSON.stringify(state));
            console.log(state, 'cart clear');
        },
    },
});

export const { addItem, removeItem, clearCart } = CartReducer.actions;

export default CartReducer.reducer;
