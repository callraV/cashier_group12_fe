//GLOBAL STATES

import { configureStore } from "@reduxjs/toolkit";
//global states
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";

export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
  },
});
