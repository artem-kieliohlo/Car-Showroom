import { Link, useParams } from "react-router-dom";
import { useGetVehicleByIdQuery } from "../../shared/api/dummyjson/vehiclesApi";
import { VehicleDetails } from "../../features/vehicles/ui/VehicleDetails";
import { VehicleReviewsSection } from "../../features/vehicles/ui/VehicleReviewsSection";
import "./VehiclePage.css";
import { QueryState } from "../../shared/ui/QueryState";

export function VehiclePage() {
  const { vehicleId } = useParams();

  const numericId = Number(vehicleId);
  const isValidId = Number.isFinite(numericId) && numericId > 0;

  const query = useGetVehicleByIdQuery(numericId, { skip: !isValidId });

  const notFound = isFetchBaseQuery404(query.error);

  return (
    <section style={{ display: "grid", gap: 12 }}>
      <Link to="/" className="vehicle-page__back-link"> &#9668; Back to vehicles</Link>

      {!isValidId && (
        <div className="vehicle-page__alert">Invalid vehicle id.</div>
      )}

      {isValidId && notFound && (
        <p style={{ margin: 0 }}>Vehicle not found (404).</p>
      )}

      {isValidId && !notFound && (
        <QueryState
          isLoading={query.isLoading}
          isError={query.isError}
          error={query.error}
          loadingText="Loading vehicle…"
          onRetry={() => query.refetch()}
        >
          {query.data && (
            <>
              <VehicleDetails vehicle={query.data} />
              <VehicleReviewsSection
                vehicleId={query.data.id}
                apiReviews={query.data.reviews ?? []}
              />
            </>
          )}
        </QueryState>
      )}
    </section>
  );
}

function isFetchBaseQuery404(err: unknown): boolean {
  if (!err || typeof err !== "object") return false;
  const e = err as { status?: unknown };
  return e.status === 404;
}
