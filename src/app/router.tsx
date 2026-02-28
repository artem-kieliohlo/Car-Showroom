import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "../pages/HomePage/HomePage";
import { VehiclePage } from "../pages/VehiclePage/VehiclePage";
import { NotFoundPage } from "../pages/NotFoundPage/NotFoundPage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/vehicles/:vehicleId", element: <VehiclePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
