/**
 * Admin Routes Configuration
 *
 * This file handles routing for the admin panel with Firebase Authentication.
 *
 * ADMIN ACCESS CONTROL:
 * - Any user with a valid Firebase Authentication account can access admin routes
 * - Users must be authenticated with Firebase (email/password)
 * - Admin panel is accessible at: /bloom-admin (not /admin for security)
 *
 * SECURITY FLOW:
 * 1. User navigates to /bloom-admin (hidden/obscure path)
 * 2. User authenticates with Firebase (email/password)
 * 3. If authentication successful: show admin routes, else: redirect to login
 *
 * TO MANAGE ADMINS:
 * - Add/remove users in Firebase Authentication console
 * - Only users with Firebase Auth accounts can access the admin panel
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

const AdminRoutes = () => {
  const [user, loading] = useAuthState(auth);

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
          !user ? (
            <Navigate to="/bloom-admin/login" />
          ) : (
            <Navigate to="/bloom-admin" />
          )
        }
      />

      {/* PROTECTED ADMIN ROUTES - Only for authenticated users */}
      {user && (
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
