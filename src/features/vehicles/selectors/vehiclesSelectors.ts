import type { RootState } from "../../../app/store/store";

export const selectVehiclesFilters = (state: RootState) => state.vehicles.filters;