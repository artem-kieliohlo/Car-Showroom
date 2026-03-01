import { useGetVehiclesByCategoryQuery } from "../../shared/api/dummyjson/vehiclesApi";
import { VehicleList } from "../../features/vehicles/ui/VehicleList";
import "./HomePage.css";

export function HomePage() {
  const { data, isLoading, isError, error, refetch } =
    useGetVehiclesByCategoryQuery();

  const vehicles = data?.products ?? [];

  return (
    <section>
      <header className="home-page__header ">
        <h1 id="home-title">Vehicles</h1>
        <button type="button" onClick={() => refetch()} className="btn">
          Refresh
        </button>
      </header>

      {isLoading && <p style={{ margin: "0 0 8px" }}>Loading vehicles…</p>}

      {isError && (
        <div className="home-page__alert-wrap ">
          <p className="alert-wrap__description">Failed to load vehicles.</p>

          <pre className="alert-wrap__pre">{formatRtkQueryError(error)}</pre>

          <button type="button" onClick={() => refetch()} className="btn">
            Try again
          </button>
        </div>
      )}

      {!isLoading && !isError && vehicles.length === 0 && (
        <p style={{ margin: 0 }}>No vehicles found.</p>
      )}

      {!isLoading && !isError && vehicles.length > 0 && (
        <VehicleList vehicles={vehicles} />
      )}
    </section>
  );
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
