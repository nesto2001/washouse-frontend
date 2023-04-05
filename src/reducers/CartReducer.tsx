import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store/AppThunk';
import { CartItem } from '../types/CartType/CartItem';
import { CartState } from '../types/CartType/CartState';
import { calculatePrice, getWeightUnitPrice } from '../utils/CommonUtils';
import { EditCartItemData } from '../types/CartType/PayloadActionType';
type Props = {};

const cartJson = localStorage.getItem('userCart');

const emptyState: CartState = {
    items: [],
    totalPrice: 0,
    totalQuantity: 0,
    totalWeight: 0,
    centerId: 0,
};

const initialState: CartState =
    cartJson && cartJson !== 'null'
        ? JSON.parse(cartJson)
        : {
              items: [],
              totalQuantity: 0,
              totalPrice: 0,
              totalWeight: 0,
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
                        const oldWeight = existingItem.weight;
                        existingItem.weight += item.weight;
                        if (existingItem.weight > item.priceChart[item.priceChart.length - 1].maxValue) {
                            throw new Error('Khối lượng vượt quá khối lượng tối đa trên bảng giá');
                        }
                        existingItem.unitPrice = getWeightUnitPrice(item.priceChart, existingItem.weight);
                        existingItem.price = calculatePrice(item.priceChart, item.minPrice, existingItem.weight);

                        state.totalPrice +=
                            existingItem.price - calculatePrice(item.priceChart, item.minPrice, oldWeight);
                        state.totalWeight += item.weight;
                    }
                } else {
                    if (existingItem.quantity && item.quantity && existingItem.price) {
                        existingItem.quantity += item.quantity;
                        existingItem.price += item.quantity * item.unitPrice;
                        state.totalQuantity += item.quantity;
                        state.totalPrice += item.quantity * item.unitPrice;
                        state.totalWeight += item.rate * item.quantity;
                    }
                }
            } else {
                state.items.push(item);
                console.log(state.totalPrice, item.price);
                state.totalQuantity += item.quantity && item.quantity > 0 ? item.quantity : 1;
                state.totalPrice += item.price ?? 0;
                if (item.rate !== 1 && item.quantity) {
                    state.totalWeight += item.quantity * item.rate;
                } else {
                    state.totalWeight += item.weight ?? 0;
                }
            }
            localStorage.setItem('userCart', JSON.stringify(state));
            return state;
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
                state.totalQuantity -= itemToRemove.quantity && itemToRemove.quantity > 0 ? itemToRemove.quantity : 1;
                state.totalPrice -= itemToRemove.price ?? 0;
                state.totalWeight -=
                    itemToRemove.weight ?? (itemToRemove.quantity && itemToRemove.quantity * itemToRemove.rate) ?? 0;
                state.items.splice(index, 1);
            }
            localStorage.setItem('userCart', JSON.stringify(state));
            if (state.items.length <= 0) {
                clearCart();
                localStorage.removeItem('userCart');
            }
            return state;
        },
        clearCart: (state) => {
            state = emptyState;
            localStorage.setItem('userCart', JSON.stringify(state));
            return state;
        },
        changeCartCenter: (state, action: PayloadAction<number>) => {
            const centerId = action.payload;
            state.centerId = centerId;
            return state;
        },
        reloadCart: (state) => {
            const cartJson = localStorage.getItem('userCart');
            const updateCartState: CartState = cartJson && JSON.parse(cartJson);
            state = updateCartState;
            localStorage.setItem('userCart', JSON.stringify(state));
            return state;
        },
        addMeasurement: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            if (!itemId) {
                return state;
            }
            const item = state.items.find((i) => i.id === itemId);
            if (item) {
                if (item.unit === 'kg' && item.weight && item.priceChart) {
                    const updateWeight = item.weight + 0.1;
                    if (updateWeight > item.priceChart[item.priceChart.length - 1].maxValue) {
                        throw new Error('Khối lượng vượt quá khối lượng tối đa trên bảng giá');
                    } else {
                        item.weight += 0.1;
                        const updatedPrice = calculatePrice(item.priceChart, item.minPrice, updateWeight);
                        state.totalPrice += updatedPrice - (item.price ?? 0);
                        item.price = updatedPrice;
                        state.totalWeight += 0.1;
                        localStorage.setItem('userCart', JSON.stringify(state));
                        return state;
                    }
                } else if (item.quantity && item.price) {
                    item.quantity += 1;
                    item.price += item.unitPrice;
                    state.totalPrice += item.unitPrice;
                    state.totalWeight += item.rate * 1;
                    state.totalQuantity += 1;
                    localStorage.setItem('userCart', JSON.stringify(state));
                    return state;
                }
            }
            return state;
        },
        subMeasurement: (state, action: PayloadAction<number>) => {
            const itemId = action.payload;
            if (!itemId) {
                return state;
            }
            const item = state.items.find((i) => i.id === itemId);
            if (item) {
                if (item.unit === 'kg' && item.weight && item.priceChart) {
                    const updateWeight = item.weight - 0.1;
                    if (updateWeight <= 0) {
                        return state;
                    } else {
                        item.weight -= 0.1;
                        const updatedPrice = calculatePrice(item.priceChart, item.minPrice, updateWeight);
                        state.totalPrice -= (item.price ?? 0) - updatedPrice;
                        item.price = updatedPrice;
                        state.totalWeight -= 0.1;
                        localStorage.setItem('userCart', JSON.stringify(state));
                        return state;
                    }
                } else if (item.quantity && item.price) {
                    item.quantity -= 1;
                    item.price -= item.unitPrice;
                    state.totalPrice -= item.unitPrice;
                    state.totalWeight -= item.rate * 1;
                    state.totalQuantity -= 1;
                    localStorage.setItem('userCart', JSON.stringify(state));
                    return state;
                }
            }
            return state;
        },
        editMeasurement: (state, action: PayloadAction<EditCartItemData>) => {
            const itemId = action.payload.id;
            const measurement = action.payload.measurement ?? 0;
            if (!itemId) {
                return state;
            }

            const item = state.items.find((i) => i.id === itemId);
            if (item) {
                if (measurement <= 0) {
                    throw new Error(
                        `${item.unit === 'kg' ? 'Khối lượng' : 'Số lượng'} không được phép nhỏ hơn hoặc bằng 0`,
                    );
                }
                if (item.unit === 'kg' && item.weight && item.priceChart && item.price) {
                    if (measurement > item.priceChart[item.priceChart.length - 1].maxValue) {
                        throw new Error(`Khối lượng trong giỏ đã vượt quá mức tối đa của dịch vụ`);
                    }
                    const updatedPrice = calculatePrice(item.priceChart, item.minPrice, measurement);
                    state.totalPrice += updatedPrice - item.price;
                    state.totalWeight += measurement - item.weight;
                    item.price = updatedPrice;
                    item.weight = measurement;
                    localStorage.setItem('userCart', JSON.stringify(state));
                    return state;
                } else if (item.quantity && item.price) {
                    const updatedPrice = measurement * item.unitPrice;
                    state.totalPrice += updatedPrice - item.price;
                    state.totalWeight += measurement * item.rate - item.quantity * item.rate;
                    state.totalQuantity += measurement - item.quantity;
                    localStorage.setItem('userCart', JSON.stringify(state));
                    return state;
                }
            }
            return state;
        },
    },
});

export const {
    addItem,
    removeItem,
    clearCart,
    changeCartCenter,
    reloadCart,
    addMeasurement,
    subMeasurement,
    editMeasurement,
} = CartReducer.actions;

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

export const increaseCartItem = (item: number): AppThunk => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                dispatch(addMeasurement(item));
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const decreaseCartItem = (item: number): AppThunk => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                dispatch(subMeasurement(item));
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };
};

export const editCartItem = (item: EditCartItemData): AppThunk => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            try {
                dispatch(editMeasurement(item));
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    };
};

export default CartReducer.reducer;
