import type { ReactNode } from "react";
import { formatRtkQueryError } from "../utils/rtkQueryError";
import "./QueryState.css"

type Props = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  isEmpty?: boolean;

  loadingText?: string;
  emptyText?: string;

  onRetry?: () => void;

  children: ReactNode;
};

export function QueryState({
  isLoading,
  isError,
  error,
  isEmpty = false,
  loadingText = "Loading…",
  emptyText = "No data.",
  onRetry,
  children,
}: Props) {
  if (isLoading) {
    return (
      <p className="query-state__text query-state__text--muted">
        {loadingText}
      </p>
    );
  }

  if (isError) {
    return (
      <div  className="query-state query-state--error">
        <p className="query-state__title">Request failed.</p>
        <pre className="query-state__pre">{formatRtkQueryError(error)}</pre>

        {onRetry && (
          <button type="button" onClick={onRetry} className="query-state__btn">
            Try again
          </button>
        )}
      </div>
    );
  }

  if (isEmpty) {
    return (
      <p className="query-state__text query-state__text--muted">{emptyText}</p>
    );
  }

  return <>{children}</>;
}
