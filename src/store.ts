import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import deviceReducer from "./features/device/deviceSlice";

export const store = configureStore({
  reducer: {
    device: deviceReducer
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
