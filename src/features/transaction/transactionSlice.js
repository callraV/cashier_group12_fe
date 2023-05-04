import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    transaction: {
      transactionList: [],
      filteredTransaction: [],
    },
    topProduct: [],
    filteredProduct: [],
    categoryProduct: [],
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
    resetTopProduct: (state) => {
      state.topProduct = [];
    },
    resetCategoryProduct: (state) => {
      state.categoryProduct = [];
    },
    setTopProduct: (state, action) => {
      state.topProduct = action.payload;
    },
    setCategoryProduct: (state, action) => {
      state.categoryProduct = action.payload;
    },
    filterCategoryProduct: (state, action) => {
      state.filteredProduct = [...state.topProduct].filter((val) => {
        return val.category === action.payload;
      });
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

export const getTopProduct = (id) => {
  return async (dispatch) => {
    console.log("Top product works");
    dispatch(resetTopProduct());
    let response = await Axios.get(
      `http://localhost:8000/transaction/fetchtopproduct/${id}`
    );
    if (response.data.success) {
      let topProductData = response.data.result;
      let categoryProduct = topProductData
        .map((val) => val.category)
        .filter((val, index, self) => self.indexOf(val) === index);
      // console.log(a);
      dispatch(setCategoryProduct(categoryProduct));
      dispatch(setTopProduct(response.data.result));
    } else {
      alert(response.data.message);
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

export const {
  setTransaction,
  setGrossIncome,
  resetGrossIncome,
  resetTopProduct,
  setTopProduct,
  resetCategoryProduct,
  setCategoryProduct,
  filterCategoryProduct,
} = transactionSlice.actions;

export default transactionSlice.reducer;
