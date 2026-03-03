import type { DummyVehicle } from "../../../shared/api/dummyjson/types";
import { VehicleGallery } from "./VehicleGallery";
import "./VehicleDetails.css";

type Props = {
  vehicle: DummyVehicle;
};

export function VehicleDetails({ vehicle }: Props) {
  const title = `${vehicle.brand} — ${vehicle.title}`;

  return (
    <article className="vehicle-details">
      <header className="vehicle-details__header ">
        <h1 className="vehicle-details__title">{title}</h1>
        <p className="vehicle-details__subtitle">{vehicle.description}</p>
      </header>

      <div className="vehicle-details__layout">
        <VehicleGallery images={vehicle.images} alt={title} />

        <section className="vehicle-details__panel">
          <dl className="vehicle-details__specs">
            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Price</dt>
              <dd className="vehicle-details__muted--soft-term">
                <strong>${vehicle.price.toLocaleString()}</strong>
                {vehicle.discountPercentage ? (
                  <span> (discount {vehicle.discountPercentage}%)</span>
                ) : null}
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Rating</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.rating}
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Stock</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.stock} - <span>{vehicle.availabilityStatus}</span>
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Brand</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.brand}
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">SKU</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.sku}
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Warranty</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.warrantyInformation}
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Shipping</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.shippingInformation}
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Return policy</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.returnPolicy}
              </dd>
            </div>

            <div className="vehicle-details__spec">
              <dt className="vehicle-details__spec-term">Tags</dt>
              <dd className="vehicle-details__muted--soft-term">
                {vehicle.tags?.join(", ") || "—"}
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </article>
  );
}
