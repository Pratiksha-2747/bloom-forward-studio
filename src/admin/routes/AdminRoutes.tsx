import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";

import HomeImages from "../pages/services/HomeImages";
import WorkImages from "../pages/services/WorkImages";
import JourneyImages from "../pages/services/JourneyImages";
import ServicesImages from "../pages/services/ServicesImages";

const AdminRoutes = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="login"
        element={!user ? <Login /> : <Navigate to="/admin" />}
      />

      {/* DASHBOARD = INDEX */}
      <Route
        index
        element={user ? <Dashboard /> : <Navigate to="/admin/login" />}
      />

      {/* SERVICES MENU */}
      <Route
        path="services"
        element={user ? <Services /> : <Navigate to="/admin/login" />}
      />

      {/* SERVICES FORMS */}
      <Route
        path="services/home"
        element={user ? <HomeImages /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="services/work"
        element={user ? <WorkImages /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="services/journey"
        element={user ? <JourneyImages /> : <Navigate to="/admin/login" />}
      />
      <Route
        path="services/service"
        element={user ? <ServicesImages /> : <Navigate to="/admin/login" />}
      />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default AdminRoutes;
