import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const productSlice = createSlice({
  name: "product",

  initialState: {
    productList: [],
    quantity: 1,
    salesType: "Dine-in",

    //-------------FILTER--------------------------
    // searchName: "",
    // filteredName: [],
    searchCategory: "",
    filteredCategory: [],
    sortBy: "",
  },

  reducers: {
    setProduct: (state, actions) => {
      state.productList = actions.payload; //change "state" into "action"'s value
    },
    //------quantity
    addQuantity: (state) => {
      state.quantity += 1;
    },
    decrsQuantity: (state) => {
      state.quantity -= 1;
      if (state.quantity < 1) {
        state.quantity = 1;
      }
    },
    resetQuantity: (state) => {
      state.quantity = 1;
    },
    //-------sizes
    salesTypeHandler: (state, value) => {
      state.salesType = value.payload;
    },

    ///------------------FILTER----------------------

    searchCategoryHandler: (state, value) => {
      state.searchCategory = value.payload;
    },
    sortByHandler: (state, value) => {
      state.sortBy = value.payload;
    },
    setFilteredCategory: (state, actions) => {
      state.filteredCategory = actions.payload; //change "state" into "action"'s value
    },
    setFilteredName: (state, actions) => {
      state.filteredName = actions.payload; //change "state" into "action"'s value
    },
  },
});

export function getProducts() {
  return async (dispatch) => {
    // try {
    const response = await Axios.get("http://localhost:2000/products"); //array
    dispatch(setProduct(response.data));
    // } catch (error) {
    //   console.log("ERROR\n" + error);
    // }
  };
}

export const { addProduct, setProduct, addQuantity, decrsQuantity, resetQuantity, salesTypeHandler, searchProductHandler, searchCategoryHandler, setFilteredCategory, setFilteredName, sortByHandler } = productSlice.actions;

export default productSlice.reducer;
