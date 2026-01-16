import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Services from "../pages/Services";
import HomeImages from "../pages/services/HomeImages";
import WorkImages from "../pages/services/WorkImages";
import JourneyImages from "../pages/services/JourneyImages";



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
      <Route path="*" element={<Navigate to="/admin/login" />} />
    <Route path="services" element={<Services />} />
<Route path="services/home" element={<HomeImages />} />
<Route path="services/work" element={<WorkImages />} />
<Route path="services/journey" element={<JourneyImages />} />
    </Routes>
  );
};

export default AdminRoutes;
