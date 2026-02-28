import { STORAGE_KEYS } from "./storageKeys";
import type { StoredCommentsByVehicleId } from "../types/comments";

function safeJsonParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function isStoredCommentsShape(value: unknown): value is StoredCommentsByVehicleId {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;

  const obj = value as Record<string, unknown>;
  return Object.values(obj).every((v) => Array.isArray(v));
}

export function loadStoredComments(): StoredCommentsByVehicleId {
  const raw = localStorage.getItem(STORAGE_KEYS.comments);
  const parsed = safeJsonParse<unknown>(raw, {});

  if (!isStoredCommentsShape(parsed)) {
    return {};
  }

  return parsed;
}

export function saveStoredComments(data: StoredCommentsByVehicleId): void {
  localStorage.setItem(STORAGE_KEYS.comments, JSON.stringify(data));
}

export function getCommentsForVehicle(
  all: StoredCommentsByVehicleId,
  vehicleId: string | number
) {
  const key = String(vehicleId);
  return all[key] ?? [];
}