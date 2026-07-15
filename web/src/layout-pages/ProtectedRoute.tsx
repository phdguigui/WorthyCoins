import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { Sidebar } from "../components/Sidebar";

export function ProtectedRoute() {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
        <Outlet />
      </main>
    </div>
  );
}

