import { configureStore } from "@reduxjs/toolkit";
import { vehiclesReducer } from "../../features/vehicles/vehiclesSlice";
import { commentsReducer } from "../../features/comments/commentsSlice";

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    comments: commentsReducer,
  },
});

// Типы для Typed hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;