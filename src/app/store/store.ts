import { configureStore } from "@reduxjs/toolkit";
import { vehiclesReducer } from "../../features/vehicles/vehiclesSlice";
import { commentsReducer } from "../../features/comments/commentsSlice";
import { vehiclesApi } from "../../shared/api/dummyjson/vehiclesApi";
import { loadStoredComments } from "../../shared/storage/commentsStorage";

const preloadedComments = loadStoredComments();

export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
    comments: commentsReducer,

    [vehiclesApi.reducerPath]: vehiclesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vehiclesApi.middleware),

  preloadedState: {
    comments: {
      byVehicleId: preloadedComments,
    },
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;