import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { DummyCategoryResponse, DummyVehicle } from "./types";

export const vehiclesApi = createApi({
  reducerPath: "vehiclesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com",
  }),
  tagTypes: ["Vehicles", "Vehicle"],
  endpoints: (builder) => ({
    
    getVehiclesByCategory: builder.query<DummyCategoryResponse<DummyVehicle>, void>({
      query: () => "/products/category/vehicle/dada",
      providesTags: (result) =>
        result
          ? [
              { type: "Vehicles", id: "LIST" },
              ...result.products.map((v) => ({ type: "Vehicle" as const, id: v.id })),
            ]
          : [{ type: "Vehicles", id: "LIST" }],
    }),

    getVehicleById: builder.query<DummyVehicle, number | string>({
      query: (id) => `/products/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Vehicle", id: Number(id) }],
    }),
  }),
});

export const {
  useGetVehiclesByCategoryQuery,
  useGetVehicleByIdQuery,
} = vehiclesApi;