import { NavLink, Outlet } from "react-router-dom";
import "./RootLayout.css";

export function RootLayout() {
  return (
    <div className="layout">
      <header className="layout__header">
        <div className="layout__container">
          <nav className="layout__nav">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "layout__brand layout__brand--active"
                  : "layout__brand"
              }
            >
              Car Showroom
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="layout__main">
        <div className="layout__container">
          <div className="layout__outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
