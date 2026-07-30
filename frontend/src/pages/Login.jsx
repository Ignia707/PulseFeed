import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api";
import { useAuth } from "../context/AuthContext";
import "./AuthForm.css";
import Loading from "./Loading";
import Toast from "../components/Toast";

function Login() {
  const { login } = useAuth();
  const [status, setStatus] = useState("");
  const [toast, setToast] = useState(null); // { message, variant }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus("Verifying");
      const result = await loginUser(formData);

      login(result.user, result.accessToken);
      setStatus("Logging In");

      navigate("/");
      setStatus("");
      console.log("User logged in successfully");
    } catch (err) {
      setStatus("");
      setToast({
        message: err.message || "Login failed. Please try again.",
        variant: "error",
      });
      console.error("ERROR in login: ", err);
    }
  };

  return status ? (
    <Loading status={status} />
  ) : (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" className="auth-btn">
          Login
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>

      <Toast
        message={toast?.message}
        variant={toast?.variant}
        onClose={() => setToast(null)}
      />
    </div>
  );
}

export default Login;
