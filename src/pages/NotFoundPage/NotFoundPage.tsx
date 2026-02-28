import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <section >
      <h1 id="notfound-title" style={{ margin: "0 0 12px" }}>
        Page not found
      </h1>

      <p style={{ margin: "0 0 12px", opacity: 0.8 }}>
        Такой страницы не существует.
      </p>

      <Link to="/">Go to Home</Link>
    </section>
  );
}
