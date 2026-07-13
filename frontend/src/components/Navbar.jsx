import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";


function Navbar() {

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // return the user to home and then logout
  const handleClick = () => {
    navigate('/');
    logout();
  } 

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">MyApp</Link>
      </div>
      
      <div className="navbar-links">
        { // if no user logged in
        (!user && ( 
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ))}

        { // if any user logged in
        (user && <Link to="/">Home</Link>)}

        { // if admin user logged in
        (user && user.role === "admin" && <Link to="/admin">Admin</Link>)}
        
        { // if any user logged in - for logout
        (user && (
          <>
          <Link to="/image/get">Gallery</Link>
          <button onClick={handleClick} type="button">
            Logout
          </button>
          </>
        ))}

      </div>
    </nav>
  );
}

export default Navbar;