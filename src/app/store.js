//GLOBAL STATES

import { configureStore } from "@reduxjs/toolkit";
//global states
import productReducer from "../features/productSlice";
import cartReducer from "../features/cartSlice";
import userReducer from "../features/users/userSlice";
import transactionReducer from "../features/transaction/transactionSlice";

export default configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    user: userReducer,
    transaction: transactionReducer,
  },
});
