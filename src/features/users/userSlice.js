import { createSlice } from "@reduxjs/toolkit";
import Axios from "axios";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: "",
      name: "",
      email: "",
      storeName: "",
      phone: "",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

export function loginUser(data) {
  return async (dispatch) => {
    const response = await Axios.post("http://localhost:8000/user/login", data);
    console.log(response);
    dispatch(setUser(response.data.data));
  };
}
