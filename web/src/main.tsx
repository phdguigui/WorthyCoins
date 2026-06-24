import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { LoginPage } from "./pages/login-page/LoginPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/register-page/RegisterPage.tsx";
import { HomePage } from "./pages/home-page/HomePage.tsx";
import { ProtectedRoute } from "./layout-pages/ProtectedRoute.tsx";
import { PublicRoute } from "./layout-pages/PublicRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
