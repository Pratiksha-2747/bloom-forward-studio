import "../styles/admin.css"; // ✅ REQUIRED (loads admin styles)
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
<<<<<<< HEAD
import Leads from "../pages/Leads";
import Services from "../pages/Services";
import Instagram from "../pages/Instagram"; // ✅ REQUIRED IMPORT
=======
import Services from "../pages/Services";

import HomeImages from "../pages/services/HomeImages";
import WorkImages from "../pages/services/WorkImages";
import JourneyImages from "../pages/services/JourneyImages";
import ServicesImages from "../pages/services/ServicesImages";
>>>>>>> 4be3222ebf7f98acff2afe4827859a5c4cb6af1c

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

<<<<<<< HEAD
=======
      {/* DASHBOARD = INDEX */}
>>>>>>> 4be3222ebf7f98acff2afe4827859a5c4cb6af1c
      <Route
        index
        element={user ? <Dashboard /> : <Navigate to="/admin/login" />}
      />

<<<<<<< HEAD
      <Route
        path="leads"
        element={user ? <Leads /> : <Navigate to="/admin/login" />}
      />

=======
      {/* SERVICES MENU */}
>>>>>>> 4be3222ebf7f98acff2afe4827859a5c4cb6af1c
      <Route
        path="services"
        element={user ? <Services /> : <Navigate to="/admin/login" />}
      />

<<<<<<< HEAD
      {/* ✅ INSTAGRAM ADMIN PAGE */}
      <Route
        path="instagram"
        element={user ? <Instagram /> : <Navigate to="/admin/login" />}
      />

      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
=======
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
>>>>>>> 4be3222ebf7f98acff2afe4827859a5c4cb6af1c
    </Routes>
  );
};

export default AdminRoutes;
