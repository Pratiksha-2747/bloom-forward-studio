/**
 * Admin Setup Utility
 *
 * This utility helps initialize admin users in Firebase Firestore.
 * Run this once to set up the initial admin users.
 *
 * Usage: Call setupInitialAdmins() in the browser console or create a setup page
 */

import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// Initial admin emails to migrate from hardcoded system
const INITIAL_ADMIN_EMAILS = [
  "pratikshajani70@gmail.com",
  "artijangid73@gmail.com",
  "ritunaik53@gmail.com",
  "rimjhim.gondane@gmail.com"
];

export const setupInitialAdmins = async () => {
  console.log("Setting up initial admin users in Firebase...");

  try {
    for (const email of INITIAL_ADMIN_EMAILS) {
      const adminDocRef = doc(db, "admins", email);

      await setDoc(adminDocRef, {
        isAdmin: true,
        role: "admin",
        addedAt: new Date(),
        addedBy: "system_setup"
      });

      console.log(`✅ Added admin: ${email}`);
    }

    console.log("🎉 All initial admins have been set up successfully!");
    console.log("You can now manage admin access through Firebase Firestore.");
  } catch (error) {
    console.error("❌ Error setting up admins:", error);
  }
};

// Function to check if a user is an admin
export const checkAdminStatus = async (email: string): Promise<boolean> => {
  try {
    const adminDocRef = doc(db, "admins", email);
    const adminDoc = await getDoc(adminDocRef);
    return adminDoc.exists() && adminDoc.data()?.isAdmin === true;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Function to add a new admin
export const addAdmin = async (email: string, addedBy: string = "admin") => {
  try {
    const adminDocRef = doc(db, "admins", email);

    await setDoc(adminDocRef, {
      isAdmin: true,
      role: "admin",
      addedAt: new Date(),
      addedBy: addedBy
    });

    console.log(`✅ Admin added: ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Error adding admin:", error);
    return false;
  }
};

// Function to remove admin access
export const removeAdmin = async (email: string) => {
  try {
    const adminDocRef = doc(db, "admins", email);
    await deleteDoc(adminDocRef);
    console.log(`✅ Admin removed: ${email}`);
    return true;
  } catch (error) {
    console.error("❌ Error removing admin:", error);
    return false;
  }
};