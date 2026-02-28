import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type VehiclesStatus = "idle" | "loading" | "succeeded" | "failed";

export type VehiclesFilters = {
  query: string; 
  brand: string; 
};

type VehiclesState = {
  status: VehiclesStatus;
  error: string | null;
  items: unknown[]; 
  filters: VehiclesFilters;
};

const initialState: VehiclesState = {
  status: "idle",
  error: null,
  items: [],
  filters: {
    query: "",
    brand: "all",
  },
};

const vehiclesSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.filters.query = action.payload;
    },
    setBrand(state, action: PayloadAction<string>) {
      state.filters.brand = action.payload;
    },
    // Временные экшены, чтобы удобно тестировать UI до подключения API
    setItems(state, action: PayloadAction<unknown[]>) {
      state.items = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    setLoading(state) {
      state.status = "loading";
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const vehiclesActions = vehiclesSlice.actions;
export const vehiclesReducer = vehiclesSlice.reducer;