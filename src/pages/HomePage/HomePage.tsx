import { useMemo } from "react";
import { useGetVehiclesByCategoryQuery } from "../../shared/api/dummyjson/vehiclesApi";
import { VehicleList } from "../../features/vehicles/ui/VehicleList";
import { VehiclesFilters } from "../../features/vehicles/ui/VehiclesFilters";
import { useAppSelector } from "../../app/store/hooks";
import { selectVehiclesFilters } from "../../features/vehicles/selectors/vehiclesSelectors";
import type { DummyVehicle } from "../../shared/api/dummyjson/types";
import "./HomePage.css";

export function HomePage() {
  const { data, isLoading, isError, error, refetch } =
    useGetVehiclesByCategoryQuery();
  const filters = useAppSelector(selectVehiclesFilters);

  const vehicles = data?.products ?? [];

  const filteredVehicles = useMemo(() => {
    return applyVehiclesFilters(vehicles, filters.query, filters.brand);
  }, [vehicles, filters.query, filters.brand]);

  return (
    <section>
      <header className="home-page__header ">
        <h1 id="home-title">Vehicles</h1>
        <button type="button" onClick={() => refetch()} className="btn">
          Refresh
        </button>
      </header>

      {!isLoading && !isError && <VehiclesFilters vehicles={vehicles} />}

      {isLoading && <p style={{ margin: 0 }}>Loading vehicles…</p>}

      {isError && (
        <div className="home-page__alert-wrap ">
          <p className="alert-wrap__description">Failed to load vehicles.</p>

          <pre className="alert-wrap__pre">{formatRtkQueryError(error)}</pre>

          <button type="button" onClick={() => refetch()} className="btn">
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && filteredVehicles.length === 0 && (
        <p style={{ margin: 0 }}>No vehicles match your filters.</p>
      )}

      {!isLoading && !isError && filteredVehicles.length > 0 && (
        <VehicleList vehicles={filteredVehicles} />
      )}
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
    const matchesQuery = hay.includes(q);

    return matchesBrand && matchesQuery;
  });
}

function formatRtkQueryError(err: unknown): string {
  if (!err) return "Unknown error";
  if (typeof err === "string") return err;

  if (typeof err === "object") {
    try {
      return JSON.stringify(err, null, 2);
    } catch {
      return "Unserializable error object";
    }
  }

  return String(err);
}
