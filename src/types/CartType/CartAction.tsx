import { createAction } from "@reduxjs/toolkit";
import { AddToCartAction } from "../../actions/AddToCartAction";
import { PayloadAction } from "../../actions/PayloadAction";
import { RemoveFromCartAction } from "../../actions/RemoveFromCartAction";
import { CartItem } from "./CartItem";

export const addItem = createAction<PayloadAction<CartItem>>('cart/addItem');
export const removeItem = createAction<PayloadAction<number>>('cart/removeItem');