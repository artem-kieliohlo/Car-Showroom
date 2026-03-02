import { useMemo } from "react";
import type { DummyVehicle } from "../../../shared/api/dummyjson/types";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { vehiclesActions } from "../vehiclesSlice";
import { selectVehiclesFilters } from "../selectors/vehiclesSelectors";
import "./VehiclesFilters.css";

type Props = {
  vehicles: DummyVehicle[];
};

export function VehiclesFilters({ vehicles }: Props) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectVehiclesFilters);

  const brands = useMemo(() => {
    const set = new Set<string>();
    for (const v of vehicles) set.add(v.brand);
    return ["all", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [vehicles]);

  return (
    <form className="filter-form" onSubmit={(e) => e.preventDefault()}>
      <label className="filter-form__field">
        <span className="filter-form__label">Search</span>
        <input
          value={filters.query}
          onChange={(e) => dispatch(vehiclesActions.setQuery(e.target.value))}
          placeholder="Search by title / brand…"
          maxLength={80}
          className="filter-form__input"
        />
      </label>

      <label className="filter-form__field">
        <span className="filter-form__label">Brand</span>
        <select
          value={filters.brand}
          onChange={(e) => dispatch(vehiclesActions.setBrand(e.target.value))}
          className="filter-form__input"
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b === "all" ? "All brands" : b}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => dispatch(vehiclesActions.resetFilters())}
        className="filter-form__resetBtn"
      >
        Reset
      </button>
    </form>
  );
}
