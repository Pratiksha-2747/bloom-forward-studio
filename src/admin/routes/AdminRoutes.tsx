/**
 * Admin Routes Configuration
 *
 * This file handles routing for the admin panel with Firebase-based role access control.
 *
 * ADMIN ACCESS CONTROL:
 * - Admin status is determined by documents in the 'admins' Firestore collection
 * - Each admin document has the user's email as the document ID
 * - Document structure: { isAdmin: true, role: "admin", addedBy: "system" }
 * - Users must be authenticated with Firebase AND have an admin document in Firestore
 * - Admin panel is accessible at: /bloom-admin (not /admin for security)
 *
 * SECURITY FLOW:
 * 1. User navigates to /bloom-admin (hidden/obscure path)
 * 2. User authenticates with Firebase (email/password)
 * 3. System queries Firestore 'admins' collection for user's email
 * 4. If admin document exists: show admin routes, else: show access denied page
 *
 * TO ADD/REMOVE ADMINS:
 * - Add/remove documents in Firestore 'admins' collection
 * - Document ID should be the admin's email address
 * - Document data: { isAdmin: true, role: "admin", addedAt: new Date() }
 */

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

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

// Firebase-based admin check function
const checkAdminStatus = async (email: string): Promise<boolean> => {
  try {
    // Check if user exists in admins collection
    const adminDocRef = doc(db, "admins", email);
    const adminDoc = await getDoc(adminDocRef);

    return adminDoc.exists() && adminDoc.data()?.isAdmin === true;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

const AdminRoutes = () => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminCheckLoading, setAdminCheckLoading] = useState(false);

  useEffect(() => {
    const verifyAdminStatus = async () => {
      if (user?.email) {
        setAdminCheckLoading(true);
        try {
          const adminStatus = await checkAdminStatus(user.email);
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error("Error verifying admin status:", error);
          setIsAdmin(false);
        } finally {
          setAdminCheckLoading(false);
        }
      } else {
        setIsAdmin(false);
        setAdminCheckLoading(false);
      }
    };

    verifyAdminStatus();
  }, [user]);

  if (loading || adminCheckLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bloom-cream via-background to-bloom-cream/50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verifying admin access...</p>
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
