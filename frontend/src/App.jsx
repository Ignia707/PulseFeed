// App.jsx - the root component

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Unauthorized from "./pages/Unauthorized";
import Gallery from "./pages/Gallery";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import { notifyBackend } from "./api";

function App() {
  useEffect(() => {
    const wakeUpBackend = async () => {
      try {
        const res = await notifyBackend();
        console.log("Backend notified:", res);
      } catch (err) {
        console.error("Backend warm-up failed:", err);
      }
    };

    wakeUpBackend();
  }, []);
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin"
          element={
            <ProtectedRoute requiredRole="superadmin">
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/image/get" element={<Gallery />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
