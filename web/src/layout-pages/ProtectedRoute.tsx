import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { Sidebar } from "../components/Sidebar/Sidebar";

export function ProtectedRoute() {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
