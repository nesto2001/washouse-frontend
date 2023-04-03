import { configureStore } from '@reduxjs/toolkit';
import CartReducer from '../reducers/CartReducer';
import thunkMiddleware from 'redux-thunk';

const CartStore = configureStore({
    reducer: {
        cart: CartReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            immutableCheck: true,
            serializableCheck: true,
        }).concat(thunkMiddleware),
});

export type RootState = ReturnType<typeof CartStore.getState>;
export type AppDispatch = typeof CartStore.dispatch;

export default CartStore;
