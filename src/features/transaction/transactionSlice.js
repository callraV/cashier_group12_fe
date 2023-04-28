import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";
import { format } from "date-fns";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: {
      transactionList: [],
      filteredTransaction: [],
    },
  },
  reducers: {
    setTransaction: (state, action) => {
      state.transaction.transactionList = action.payload;
    },
  },
});

export const fetchAllTransaction = (userId) => {
  return async (dispatch) => {
    // console.log("fetching is working", userId);
    let response = await Axios.get(
      `http://localhost:8000/transaction/getalltransaction/${userId}`
    );
    console.log(response.data.message);
  };
};

export const addTransactionProduct = (data) => {
  return async (dispatch) => {
    // let passingData = { ...data, test: "Tanngal di sini yak" };
    console.log(data);
    let response = await Axios.post(
      `http://localhost:8000/transaction/addtransactionproduct`,
      data
    );
    // console.log(response);
    // let a = Date.now();
    // console.log(format(a, "MMMM dd, yyyy"));
  };
};

export const addTransaction = (data) => {
  return async (dispatch) => {
    let response = await Axios.post(
      `http://localhost:8000/transaction/addtransaction`,
      data
    );
  };
};

export const { setTransaction } = transactionSlice.actions;

export default transactionSlice.reducer;
