import { useMemo } from "react";
import { useGetVehiclesByCategoryQuery } from "../../shared/api/dummyjson/vehiclesApi";
import { VehicleList } from "../../features/vehicles/ui/VehicleList";
import { VehiclesFilters } from "../../features/vehicles/ui/VehiclesFilters";
import { useAppSelector } from "../../app/store/hooks";
import { selectVehiclesFilters } from "../../features/vehicles/selectors/vehiclesSelectors";
import type { DummyVehicle } from "../../shared/api/dummyjson/types";
import { QueryState } from "../../shared/ui/QueryState";
import "./HomePage.css";

export function HomePage() {
  const { data, isLoading, isError, error, refetch } =
    useGetVehiclesByCategoryQuery();
  const filters = useAppSelector(selectVehiclesFilters);

  const vehicles = data?.products ?? [];

  const filteredVehicles = useMemo(() => {
    return applyVehiclesFilters(vehicles, filters.query, filters.brand);
  }, [vehicles, filters.query, filters.brand]);

  const isEmpty = !isLoading && !isError && filteredVehicles.length === 0;

  return (
    <section>
      <header className="home-page__header ">
        <h1 id="home-title">Vehicles</h1>
        <button type="button" onClick={() => refetch()} className="btn">
          Refresh
        </button>
      </header>

      {!isLoading && !isError && <VehiclesFilters vehicles={vehicles} />}

      <QueryState
        isLoading={isLoading}
        isError={isError}
        error={error}
        isEmpty={isEmpty}
        loadingText="Loading vehicles…"
        emptyText="No vehicles match your filters."
        onRetry={() => refetch()}
      >
        <VehicleList vehicles={filteredVehicles} />
      </QueryState>
    </section>
  );
}

function applyVehiclesFilters(
  vehicles: DummyVehicle[],
  query: string,
  brand: string,
): DummyVehicle[] {
  const q = query.trim().toLowerCase();
  const brandKey = brand.trim().toLowerCase();

  return vehicles.filter((v) => {
    const matchesBrand =
      brandKey === "all" ? true : v.brand.toLowerCase() === brandKey;

    if (!q) return matchesBrand;

    const hay =
      `${v.title} ${v.brand} ${v.tags?.join(" ") ?? ""}`.toLowerCase();
    return matchesBrand && hay.includes(q);
  });
}
