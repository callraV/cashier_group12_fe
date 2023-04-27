import { configureStore } from "@reduxjs/toolkit";
//global states
import productReducer from "../features/products/productSlice";
import transactionReducer from "../features/transactions/transactionSlice";
import userReducer from "../features/users/userSlice";

export default configureStore({
  reducer: {
    product: productReducer,
    transaction: transactionReducer,
    user: userReducer,
  },
});
