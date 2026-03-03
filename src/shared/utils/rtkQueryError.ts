export function formatRtkQueryError(err: unknown): string {
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