import "./CommentsList.css";
type ReviewViewItem = {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  source: "api" | "local";
};

type Props = {
  items: ReviewViewItem[];
};

export function CommentsList({ items }: Props) {
  return (
    <section aria-label="Comments list" className="comments-list">
      {items.length === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul className="comments-list__items">
          {items.map((it) => (
            <li key={it.id} className="comments-list__item">
              <div className="comments-list__item-header">
                <div className="comments-list__meta">
                  <strong className="comments-list__author">{it.author}</strong>
                  <span className="comments-list__subline">
                    {formatDate(it.date)} · rating {it.rating} ·{" "}
                    {it.source.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="comments-list__comment">{it.comment}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString();
}
