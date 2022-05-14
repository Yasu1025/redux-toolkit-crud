import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postSlice from "./features/postSlice";

export const store = configureStore({
  reducer: {
    post: postSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
