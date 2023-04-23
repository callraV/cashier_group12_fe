import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const productSlice = createSlice({
  name: "product",

  initialState: {
    productList: [],
    categoryList: [],
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
    setProduct: (state, action) => {
      state.productList = action.payload; //change "state" into "action"'s value
    },

    setCategory: (state, action) => {
      state.categoryList = action.payload;
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

export const {
  addProduct,
  setProduct,
  setCategory,
  addQuantity,
  decrsQuantity,
  resetQuantity,
  salesTypeHandler,
  searchProductHandler,
  searchCategoryHandler,
  setFilteredCategory,
  setFilteredName,
  sortByHandler,
} = productSlice.actions;

export default productSlice.reducer;

export function getProducts() {
  return async (dispatch) => {
    try {
      const response = await Axios.get(
        "http://localhost:8000/product/productlist"
      ); //array
      // console.log(response);
      if (response.data) {
        dispatch(setProduct(response.data.allProduct));
      }
    } catch (error) {
      console.log("ERROR\n" + error);
    }
  };
}

export function getProductCategory() {
  return async (dispatch) => {
    try {
      let response = await Axios.get(
        "http://localhost:8000/category/categorylist"
      );
      if (response.data.success) {
        dispatch(setCategory(response.data.categoryList));
      }
    } catch (error) {
      console.log(`Error : ${error}`);
    }
  };
}
