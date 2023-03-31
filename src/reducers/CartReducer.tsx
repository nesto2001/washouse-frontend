import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message, Modal } from 'antd';
import { getService } from '../repositories/ServiceRepository';
import { CartItem } from '../types/CartType/CartItem';
import { CartState } from '../types/CartType/CartState';
import { calculatePrice } from '../utils/CommonUtils';
import { showMessage } from '../utils/ShowMessageUtils';
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
      };

const CartReducer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const item = action.payload;
            let cartJson = localStorage.getItem('userCart');
            if (cartJson) {
                const cartState: CartState = JSON.parse(cartJson);
                state = cartState;
            }

            if (!item) {
                return state;
            }
            if (!state.centerId) {
                state.centerId = item.centerId;
            }
            const existingItem = state.items.find((i) => i.id === item.id && i.unit === item.unit);

            if (existingItem) {
                if (item.unit === 'kg' && item.weight && existingItem.weight && item.priceChart) {
                    if (existingItem.weight) {
                        existingItem.weight += item.weight;
                        if (existingItem.weight > item.priceChart[item.priceChart.length - 1].maxValue) {
                            showMessage('error', 'Khối lượng vượt quá khối lượng tối đa trên bảng giá');
                            return state;
                        }
                        existingItem.price = calculatePrice(item.priceChart, item.minPrice, existingItem.weight);
                        state.totalPrice += existingItem.price - item.price;
                        console.log(item.price);
                    }
                } else {
                    if (existingItem.quantity && item.quantity) {
                        existingItem.quantity += item.quantity;
                        state.totalQuantity += item.quantity;
                        state.totalPrice += item.quantity * item.price;
                    }
                }
            } else {
                state.items.push(item);
                state.totalQuantity += item.quantity && item.quantity > 0 ? item.quantity : 1;
                state.totalPrice += item.price * (item.quantity && item.quantity > 0 ? item.quantity : 1);
            }
            localStorage.setItem('userCart', JSON.stringify(state));
            showMessage('success', 'Đã thêm vào giỏ hàng!');
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            let cartJson = localStorage.getItem('userCart');
            if (cartJson) {
                const cartState: CartState = JSON.parse(cartJson);
                state = cartState;
            }

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
            if (state.items.length == 0) {
                state = emptyState;
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
