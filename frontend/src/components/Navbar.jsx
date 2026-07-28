import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
    logout();
  };

  const linkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/">PulseFeed</NavLink>
      </div>

      <div className="navbar-links">
        {!user && (
          <>
            <NavLink to="/login" className={linkClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={linkClass}>
              Register
            </NavLink>
          </>
        )}

        {user && (
          <>
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/image/get" className={linkClass}>
              Gallery
            </NavLink>
            {user.role === "admin" && (
              <NavLink to="/admin" className={linkClass}>
                Admin
              </NavLink>
            )}
            {user.role === "superadmin" && (
              <NavLink to="/superadmin" className={linkClass}>
                Superadmin
              </NavLink>
            )}
          </>
        )}
      </div>

      {user && (
        <div className="navbar-actions">
          <span className="navbar-user">{user.username || user.email}</span>
          <button onClick={handleClick} type="button" className="logout-btn">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
