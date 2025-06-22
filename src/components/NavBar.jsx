import { NavLink } from "react-router-dom";
import "../css/NavBar.css";

function NavBar() {
  return (
    <nav className="navbar">
      <div className="nav-logo">
        <NavLink to="/" className="logo-link">
          Movie Mark
        </NavLink>
      </div>
      <div className="nav-pages">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/favourites"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Favourites
        </NavLink>
      </div>
    </nav>
  );
}
export default NavBar;
