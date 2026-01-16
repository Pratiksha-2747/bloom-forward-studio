import "../styles/admin.css"; // ✅ REQUIRED (loads admin styles)
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Services from "../pages/Services";
import Instagram from "../pages/Instagram"; // ✅ REQUIRED IMPORT

const AdminRoutes = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="login"
        element={!user ? <Login /> : <Navigate to="/admin/dashboard" />}
      />

      <Route
        path="dashboard"
        element={user ? <Dashboard /> : <Navigate to="/admin/login" />}
      />

      <Route
        path="leads"
        element={user ? <Leads /> : <Navigate to="/admin/login" />}
      />

      <Route
        path="services"
        element={user ? <Services /> : <Navigate to="/admin/login" />}
      />

      {/* ✅ INSTAGRAM ADMIN PAGE */}
      <Route
        path="instagram"
        element={user ? <Instagram /> : <Navigate to="/admin/login" />}
      />

      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;
