import type { DummyVehicle } from "../../../shared/api/dummyjson/types";
import { VehicleCard } from "./VehicleCard";
import "./VehicleList.css";

type Props = {
  vehicles: DummyVehicle[];
};

export function VehicleList({ vehicles }: Props) {
  return (
    <section>
      <div className="vehicle-list">
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
      </div>
    </section>
  );
}
