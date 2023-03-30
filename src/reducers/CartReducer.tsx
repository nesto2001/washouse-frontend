import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { message, Modal } from 'antd';
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
                            message.error('Khối lượng vượt quá khối lượng tối đa trên bảng giá');
                            return state;
                        }
                        existingItem.price = calculatePrice(item.priceChart, item.minPrice, existingItem.weight);
                        state.totalPrice += existingItem.price - item.price;
                        console.log(item.price);
                    }
                    // const updatedItem = { ...existingItem };
                    // console.log(updatedItem.weight);
                    // const fetchData = async () => {
                    //     return await getService(item.id);
                    // };
                    // fetchData().then((res) => {
                    //     if (updatedItem.weight && updatedItem.weight > 0) {
                    //         updatedItem.price = calculatePrice(res, updatedItem.weight);
                    //         console.log(updatedItem.price);
                    //     }
                    // });
                    // console.log(updatedItem.price);
                    // existingItem.price = updatedItem.price;
                } else {
                    if (existingItem.quantity && item.quantity) existingItem.quantity += item.quantity;
                }
            } else {
                state.items.push(item);
                state.totalQuantity += item.quantity && item.quantity > 0 ? item.quantity : 1;
                state.totalPrice += item.price * (item.quantity && item.quantity > 0 ? item.quantity : 1);
            }
            state.totalQuantity += item.quantity && item.quantity > 0 ? item.quantity : 0;
            localStorage.setItem('userCart', JSON.stringify(state));
            message.success('Đã thêm vào giở hàng!');
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
