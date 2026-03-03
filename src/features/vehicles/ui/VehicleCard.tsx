import { Link } from "react-router-dom";
import type { DummyVehicle } from "../../../shared/api/dummyjson/types";
import "./VehicleCard.css";

type Props = {
  vehicle: DummyVehicle;
};

export function VehicleCard({ vehicle }: Props) {
  return (
    <article className="card">
      <Link to={`/vehicles/${vehicle.id}`} className="card__link">
        <div className="card__media">
          <img
            src={vehicle.thumbnail}
            alt={`${vehicle.brand} ${vehicle.title}`}
            loading="lazy"
            className="card__thumb"
          />
        </div>

        <div className="card__body">
          <h2 className="card__title">
            {vehicle.brand} — {vehicle.title}
          </h2>

          <p className="card__description">{vehicle.description}</p>

          <div className="card__meta">
            <span>
              <strong>${vehicle.price.toLocaleString()}</strong>
            </span>
            <span>Rating: {vehicle.rating}</span>
            <span>Stock: {vehicle.stock}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
