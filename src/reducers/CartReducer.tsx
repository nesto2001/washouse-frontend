import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/AppThunk';
import { CartItem } from '../types/CartType/CartItem';
import { CartState } from '../types/CartType/CartState';
import { calculatePrice, getWeightUnitPrice } from '../utils/CommonUtils';
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
                throw new Error('Thêm vào giỏ hàng thất bại');
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
                            throw new Error('Khối lượng vượt quá khối lượng tối đa trên bảng giá');
                        }
                        existingItem.minPrice = getWeightUnitPrice(item.priceChart, existingItem.weight);
                        existingItem.price = calculatePrice(item.priceChart, item.minPrice, existingItem.weight);

                        state.totalPrice += existingItem.price - (item.price ?? 0);
                        console.log(item.price);
                    }
                } else {
                    if (existingItem.quantity && item.quantity) {
                        existingItem.quantity += item.quantity;
                        existingItem.price = item.quantity * item.unitPrice;
                        state.totalQuantity += item.quantity;
                        state.totalPrice += item.quantity * (item.price ?? 0);
                    }
                }
            } else {
                state.items.push(item);
                state.totalQuantity += item.quantity && item.quantity > 0 ? item.quantity : 1;
                state.totalPrice += item.price ?? 0;
            }
            localStorage.setItem('userCart', JSON.stringify(state));
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
                state.totalPrice -= itemToRemove.price ? itemToRemove.price * (itemToRemove.quantity ?? 1) : 0;

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

export const addToCart = (item: CartItem): AppThunk => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                dispatch(addItem(item));
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };
};

export default CartReducer.reducer;
