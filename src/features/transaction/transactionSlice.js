import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: {
      transactionList: [],
      filteredTransaction: [],
    },
    grossIncome: 0,
  },
  reducers: {
    setTransaction: (state, action) => {
      state.transaction.transactionList = action.payload;
    },
    setGrossIncome: (state, action) => {
      state.grossIncome += action.payload;
    },
    resetGrossIncome: (state) => {
      state.grossIncome = 0;
    },
  },
});

export const resetGrossIncomeList = () => {
  return async (dispatch) => {
    dispatch(resetGrossIncome());
  };
};

export const totalGrossIncome = (totalPricePerItem) => {
  return async (dispatch) => {
    dispatch(setGrossIncome(totalPricePerItem));
  };
};

export const fetchAllTransaction = (userId) => {
  return async (dispatch) => {
    dispatch(resetGrossIncome());
    // console.log("fetching is working", userId);
    let response = await Axios.get(
      `http://localhost:8000/transaction/getalltransaction/${userId}`
    );
    if (response.data.success) {
      dispatch(resetGrossIncome());
      response.data.result.map((val) => {
        dispatch(setGrossIncome(val.pricePerPiece * val.quantity));
      });
      dispatch(setTransaction(response.data.result));
    } else {
      alert("kenapa error yak?");
    }
  };
};

export const fetchTransactionOnDateRange = (userId, dateRange) => {
  return async (dispatch) => {
    dispatch(resetGrossIncome());
    // console.log("fetching is working", userId);
    let response = await Axios.post(
      `http://localhost:8000/transaction/gettransactionondate/${userId}`,
      dateRange
    );
    if (response.data.success) {
      response.data.result.map((val) => {
        dispatch(setGrossIncome(val.pricePerPiece * val.quantity));
      });
      console.log("Sukses yak");
      dispatch(setTransaction(response.data.result));
      return true;
    } else {
      alert(response.data.message);
      return response.data.success;
    }
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

export const { setTransaction, setGrossIncome, resetGrossIncome } =
  transactionSlice.actions;

export default transactionSlice.reducer;
