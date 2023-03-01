import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../reducers/CartReducer';

const CartStore = configureStore({
    reducer: {
        cart: CartReducer,
    },
});

export type RootState = ReturnType<typeof CartStore.getState>;
export type AppDispatch = typeof CartStore.dispatch;

export default CartStore;