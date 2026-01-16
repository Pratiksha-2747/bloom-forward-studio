/**
 * Admin Routes Configuration
 *
 * This file handles routing for the admin panel with role-based access control.
 *
 * ADMIN ACCESS CONTROL:
 * - Only users with emails listed in ADMIN_EMAILS can access admin routes
 * - To add/remove admin access, update the ADMIN_EMAILS array below
 * - Users must be authenticated with Firebase AND be in the admin list
 * - Admin panel is accessible at: /bloom-admin (not /admin for security)
 *
 * SECURITY FLOW:
 * 1. User navigates to /bloom-admin (hidden/obscure path)
 * 2. User authenticates with Firebase (email/password)
 * 3. System checks if user's email is in ADMIN_EMAILS
 * 4. If admin: show admin routes, else: show access denied page
 */

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";

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

// List of admin emails - only these users can access admin panel
// TODO: Replace with actual admin emails or implement a more dynamic system
const ADMIN_EMAILS = [
  "pratikshajani70@gmail.com",
  "artijangid73@gmail.com",
  "ritunaik53@gmail.com",
  "rimjhimgondane@gmail.com"
  // Add more admin emails here
];

// Utility function to check if user is admin
const isUserAdmin = (email: string | null): boolean => {
  return email ? ADMIN_EMAILS.includes(email) : false;
};

const AdminRoutes = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (user) {
      // Check if the authenticated user is an admin
      setIsAdmin(isUserAdmin(user.email));
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bloom-cream via-background to-bloom-cream/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* LOGIN */}
      <Route
        path="login"
        element={!user ? <Login /> : <Navigate to="/bloom-admin" />}
      />

      {/* UNAUTHORIZED ACCESS */}
      <Route
        path="*"
        element={
          user && !isAdmin ? (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bloom-cream via-background to-bloom-cream/50">
              <div className="text-center max-w-md mx-auto p-8">
                <div className="text-6xl mb-4">🚫</div>
                <h1 className="text-2xl font-serif font-semibold text-foreground mb-4">
                  Access Denied
                </h1>
                <p className="text-muted-foreground mb-6">
                  You don't have permission to access the admin panel. Only authorized administrators can view this content.
                </p>
                <a
                  href="/"
                  className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition shadow-soft"
                >
                  Return to Website
                </a>
              </div>
            </div>
          ) : !user ? (
            <Navigate to="/bloom-admin/login" />
          ) : (
            <Navigate to="/bloom-admin" />
          )
        }
      />

      {/* PROTECTED ADMIN ROUTES - Only for authenticated admins */}
      {user && isAdmin && (
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
      )}
    </Routes>
  );
};

export default AdminRoutes;
