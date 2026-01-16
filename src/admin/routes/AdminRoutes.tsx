import "../styles/admin.css"; // ✅ REQUIRED (loads admin styles)
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Leads from "../pages/Leads";
import Services from "../pages/Services";
import Instagram from "../pages/Instagram"; // ✅ REQUIRED IMPORT

import HomeImages from "../pages/services/HomeImages";
import WorkImages from "../pages/services/WorkImages";
import JourneyImages from "../pages/services/JourneyImages";
import ServicesImages from "../pages/services/ServicesImages";

import AdminLayout from "../components/AdminLayout";

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

      {/* PROTECTED ROUTES */}
      {user ? (
        <>
          {/* DASHBOARD = INDEX */}
          <Route
            index
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />

          <Route
            path="leads"
            element={
              <AdminLayout>
                <Leads />
              </AdminLayout>
            }
          />

          {/* SERVICES MENU */}
          <Route
            path="services"
            element={
              <AdminLayout>
                <Services />
              </AdminLayout>
            }
          />

          {/* ✅ INSTAGRAM ADMIN PAGE */}
          <Route
            path="instagram"
            element={
              <AdminLayout>
                <Instagram />
              </AdminLayout>
            }
          />

          {/* SERVICES FORMS */}
          <Route
            path="services/home"
            element={
              <AdminLayout>
                <HomeImages />
              </AdminLayout>
            }
          />
          <Route
            path="services/work"
            element={
              <AdminLayout>
                <WorkImages />
              </AdminLayout>
            }
          />
          <Route
            path="services/journey"
            element={
              <AdminLayout>
                <JourneyImages />
              </AdminLayout>
            }
          />
          <Route
            path="services/service"
            element={
              <AdminLayout>
                <ServicesImages />
              </AdminLayout>
            }
          />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/admin/login" />} />
      )}

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/admin/login" />} />
    </Routes>
  );
};

export default AdminRoutes;
