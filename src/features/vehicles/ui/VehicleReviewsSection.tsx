import { useMemo } from "react";
import { useAppSelector } from "../../../app/store/hooks";
import type { DummyReview } from "../../../shared/api/dummyjson/types";
import type { LocalComment } from "../../../shared/types/comments";
import { selectLocalCommentsByVehicleId } from "../../comments/selectors/commentsSelectors";
import { CommentsList } from "../../comments/ui/CommentsList";
import { AddCommentForm } from "../../comments/ui/AddCommentForm";
import "./VehicleReviewsSection.css";

type Props = {
  vehicleId: number;
  apiReviews: DummyReview[];
};

type ReviewViewItem = {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  source: "api" | "local";
};

export function VehicleReviewsSection({ vehicleId, apiReviews }: Props) {
  const local = useAppSelector((s) =>
    selectLocalCommentsByVehicleId(s, vehicleId),
  );

  const items = useMemo(() => {
    const fromApi = mapApiReviews(apiReviews);
    const fromLocal = mapLocalComments(local);

    const localSorted = fromLocal.sort((a, b) => (b.date > a.date ? 1 : -1));
    const apiSorted = fromApi.sort((a, b) => (b.date > a.date ? 1 : -1));

    return [...localSorted, ...apiSorted];
  }, [apiReviews, local]);

  return (
    <section className="vehicle-reviews">
      <header className="vehicle-reviews__header">
        <h2 className="vehicle-reviews__title">Reviews</h2>
        <p className="vehicle-reviews__hint">
          API reviews are read-only. Your comments are stored in localStorage
          and persist after reload.
        </p>
      </header>

      <AddCommentForm vehicleId={vehicleId} />

      <CommentsList items={items} />
    </section>
  );
}

function mapApiReviews(reviews: DummyReview[]): ReviewViewItem[] {
  return (reviews ?? []).map((r, index) => ({
    id: `api:${r.reviewerEmail}:${r.date}:${index}`,
    rating: r.rating,
    comment: r.comment,
    author: r.reviewerName,
    date: r.date,
    source: "api",
  }));
}

function mapLocalComments(comments: LocalComment[]): ReviewViewItem[] {
  return (comments ?? []).map((c) => ({
    id: `local:${c.id}`,
    rating: 5,
    comment: c.text,
    author: c.author,
    date: c.createdAt,
    source: "local",
  }));
}
