import { Routes, Route, Navigate } from "react-router-dom";

//pages
import { Login, Dashboard } from "./pages";

export const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
