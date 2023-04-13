import { createSlice } from "@reduxjs/toolkit";
import { getUIMode } from "utils/storage";

export interface SystemType {
  mode: string;
}

const initialState: SystemType = {
  mode: getUIMode() || "light",
};

export const systemSlice = createSlice({
  name: "system",
  initialState: initialState,
  reducers: {
    changeUIMode: (state, action) => {
      state.mode = action.payload;
    },
  },
});

export const systemActions = systemSlice.actions;

export default systemSlice.reducer;
