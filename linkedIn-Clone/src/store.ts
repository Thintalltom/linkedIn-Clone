import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/apiSlice";
export const store = configureStore(
  {
    reducer: {
      user: userReducer // this mustbe exported this way from the apiSlice 
    }
  }
)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;