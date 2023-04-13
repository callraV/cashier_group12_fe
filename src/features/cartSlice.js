import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartList: [],
    cartLength: 0,
    totalEnd: 0,
  },

  reducers: {
    addCart: (state, action) => {
      state.cartList.push(action.payload); //change "state" into "action"'s value
      state.cartLength += 1;
    },

    setCart: (state, action) => {
      // console.log(action.payload);
      state.cartLength = action.payload.length;
      state.cartList = action.payload;
    },
    setTotalEnd: (state, action) => {
      state.totalEnd = action.payload;
    },
  },
});

export function addToCart(data) {
  return async (dispatch) => {
    let response = await Axios.post("http://localhost:2000/carts", data);
    // console.log(response);
    dispatch(addCart(response.data));
    dispatch(getTotalPrice());
  };
}

//called for in CartItem.jsx :
export function removeFromCart(cartId) {
  return async (dispatch) => {
    let response = await Axios.delete("http://localhost:2000/carts/" + Object.values(cartId));
    dispatch(getCart(response.data));
    dispatch(getTotalPrice());
  };
}

//update quantity
export function getCart() {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:2000/carts");
    dispatch(setCart(response.data));
  };
}

export function getTotalPrice() {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:2000/carts");
    let totalArray = response.data.map((a) => a.totalPrice); //get every instance of "price" and store in an array
    let totalPrice = totalArray.reduce((a, b) => a + b, 0); //sum all elements in the array
    dispatch(setTotalEnd(totalPrice));
  };
}

// export function checkCart() {
//   return Axios.get("http://localhost:2000/carts");
// }

// Action creators are generated for each case reducer function
export const { addCart, setCart, setTotalEnd } = cartSlice.actions;
export default cartSlice.reducer;
