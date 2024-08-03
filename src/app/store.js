import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "../features/adminSlice";

const store = configureStore({
  reducer: adminReducer,
});

export default store;
