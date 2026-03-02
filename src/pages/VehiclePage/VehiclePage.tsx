import { Link, useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../shared/api/dummyjson/vehiclesApi";
import { VehicleDetails } from "../../features/vehicles/ui/VehicleDetails";
import { VehicleReviewsSection } from "../../features/vehicles/ui/VehicleReviewsSection";
import "./VehiclePage.css";

export function VehiclePage() {
  const { vehicleId } = useParams();

  const numericId = Number(vehicleId);
  const isValidId = Number.isFinite(numericId) && numericId > 0;

  const { data, isLoading, isError, error, refetch } = useGetVehicleByIdQuery(
    numericId,
    {
      skip: !isValidId,
    },
  );

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <Link to="/">← Back to vehicles</Link>

      {!isValidId && (
        <div className="vehicle-page__alert">Invalid vehicle id.</div>
      )}

      {isValidId && isLoading && (
        <p style={{ margin: 0}}>Loading vehicle…</p>
      )}

      {isValidId && isError && (
        <div className="vehicle-page__alert">
          <p style={{ margin: "0 0 8px" }}>Failed to load vehicle.</p>
          <pre className="vehicle-page__pre">{formatRtkQueryError(error)}</pre>

          <button
            type="button"
            onClick={() => refetch()}
            className="vehicle-page__alert-bnt "
          >
            Try again
          </button>
        </div>
      )}

      {isValidId && !isLoading && !isError && !data && (
        <div className="vehicle-page__alert">Vehicle not found.</div>
      )}

      {isValidId && data && (
        <>
          <VehicleDetails vehicle={data} />
          <VehicleReviewsSection
            vehicleId={data.id}
            apiReviews={data.reviews ?? []}
          />
        </>
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
