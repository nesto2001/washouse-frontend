import { ADD_TO_CART } from "./ActionTypes";

export interface AddToCartAction {
    type: typeof ADD_TO_CART;
    payload: {
      id: number;
      name: string;
      price: number;
    };
  }
  