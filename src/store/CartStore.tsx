import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CartReducer from '../reducers/CartReducer';
import thunkMiddleware from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, CartReducer);

const CartStore = configureStore({
    reducer: {
        cart: persistedReducer,
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
