import type { RootState } from "../../../app/store/store";
import type { LocalComment } from "../../../shared/types/comments";

export const selectLocalCommentsByVehicleId = (
  state: RootState,
  vehicleId: string | number
): LocalComment[] => {
  const key = String(vehicleId);
  return state.comments.byVehicleId[key] ?? [];
};