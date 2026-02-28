import { NavLink, Outlet } from "react-router-dom";
import "./RootLayout.css";

export function RootLayout() {
  return (
    <>
      <header>
        <div className="container">
          <NavLink to="/" className="navLink">
            Car Showroom
          </NavLink>

          <nav >
            <NavLink to="/" className="navLink">
              Vehicles
            </NavLink>
          </nav>
        </div>
      </header>

      <main>
        <div className="container">
          <Outlet />
        </div>
      </main>
    </>
  );
}
