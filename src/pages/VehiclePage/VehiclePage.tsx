import { Link, useParams } from "react-router-dom";

export function VehiclePage() {
  const { vehicleId } = useParams();

  return (
    <section >
      <h1 id="vehicle-title" style={{ margin: "0 0 12px" }}>
        Vehicle details
      </h1>

      <p style={{ margin: "0 0 12px", opacity: 0.8 }}>
        ID из роутинга: <strong>{vehicleId}</strong>
      </p>

      <Link to="/">← Back to vehicles</Link>
    </section>
  );
}
