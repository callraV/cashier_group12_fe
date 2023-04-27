import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const transactionSlice = createSlice({
  name: "transaction",

  initialState: {
    transactionList: [],
    transactionLenght: 0,
    totalEnd: 0,
  },

  reducers: {
    addTrasaction: (state, action) => {
      state.transactionList.push(action.payload); //change "state" into "action"'s value
      state.transactionLenght += 1;
    },

    setTransaction: (state, action) => {
      state.transactionLenght = action.payload.length;
      state.transactionList = action.payload;
    },
    setTotalEnd: (state, action) => {
      state.totalEnd = action.payload;
    },
  },
});

//get transaction items from database
export function getTransaction() {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:2000/transactions");
    dispatch(setTransaction(response.data));
  };
}

//add item to database
export function addToTransaction(data) {
  return async (dispatch) => {
    let response = await Axios.post("http://localhost:2000/transactions", data);
    dispatch(addTrasaction(response.data));
    dispatch(getTotalPrice());
  };
}

//remove item from database
export function removeFromTransaction(cartId) {
  return async (dispatch) => {
    let response = await Axios.delete("http://localhost:2000/transactions/" + Object.values(cartId));
    dispatch(getTransaction(response.data));
    dispatch(getTotalPrice());
  };
}

//cummulative price
export function getTotalPrice() {
  return async (dispatch) => {
    let response = await Axios.get("http://localhost:2000/transactions");
    let totalArray = response.data.map((a) => a.totalPrice); //get every instance of "price" and store in an array
    let totalPrice = totalArray.reduce((a, b) => a + b, 0); //sum all elements in the array
    dispatch(setTotalEnd(totalPrice));
  };
}

export const { addTrasaction, setTransaction, setTotalEnd } = transactionSlice.actions;

export default transactionSlice.reducer;
