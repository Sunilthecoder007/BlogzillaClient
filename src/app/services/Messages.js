import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  message: "",
};
const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state = { ...state, message: action.payload };
      return state;
    },
    clearMessage: (state) => {
      state = { ...state, message: "" };
      return state;
    },
  },
});
const { reducer, actions } = messageSlice;
export const { setMessage, clearMessage, showLoader } = actions;
export default reducer;
