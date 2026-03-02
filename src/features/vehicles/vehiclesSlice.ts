import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type VehiclesFilters = {
  query: string; 
  brand: string; 
};

type VehiclesState = {
  filters: VehiclesFilters;
};

const initialState: VehiclesState = {
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
    resetFilters(state) {
      state.filters = initialState.filters;
    },
  },
});

export const vehiclesActions = vehiclesSlice.actions;
export const vehiclesReducer = vehiclesSlice.reducer;