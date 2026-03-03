import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LocalComment, StoredCommentsByVehicleId } from "../../shared/types/comments";
import { saveStoredComments } from "../../shared/storage/commentsStorage";

type CommentsState = {
  byVehicleId: StoredCommentsByVehicleId;
};

const initialState: CommentsState = {
  byVehicleId: {},
};

type AddCommentPayload = {
  vehicleId: string | number;
  comment: LocalComment;
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment(state, action: PayloadAction<AddCommentPayload>) {
      const key = String(action.payload.vehicleId);
      const prev = state.byVehicleId[key] ?? [];

      state.byVehicleId[key] = [action.payload.comment, ...prev];

      saveStoredComments(state.byVehicleId);
    },
    clearVehicleComments(state, action: PayloadAction<string | number>) {
      const key = String(action.payload);
      delete state.byVehicleId[key];
      saveStoredComments(state.byVehicleId);
    },
    clearAllComments(state) {
      state.byVehicleId = {};
      saveStoredComments(state.byVehicleId);
    },
  },
});

export const commentsActions = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;