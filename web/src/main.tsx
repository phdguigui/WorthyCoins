import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./i18n";
import { LoginPage } from "./pages/login-page/LoginPage.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RegisterPage } from "./pages/register-page/RegisterPage.tsx";
import { ProtectedRoute } from "./layout-pages/ProtectedRoute.tsx";
import { PublicRoute } from "./layout-pages/PublicRoute.tsx";
import { Toaster } from "react-hot-toast";
import { TaskPage } from "./pages/task-page/TaskPage.tsx";
import { ChildrenPage } from "./pages/children-page/ChildrenPage.tsx";
import { UnderConstruction } from "./pages/under-construction/UnderConstruction.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toaster position="top-right" reverseOrder={false} />
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<UnderConstruction />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/children" element={<ChildrenPage />} />
          <Route path="/rewards" element={<UnderConstruction />} />
          <Route path="/settings" element={<UnderConstruction />} />
          <Route path="/notifications" element={<UnderConstruction />} />
          <Route path="/profile" element={<UnderConstruction />} />
          <Route path="*" element={<UnderConstruction />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
