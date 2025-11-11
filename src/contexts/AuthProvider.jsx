
import React, { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { auth } from "../firebase/firebase.config";

export const AuthContext = createContext();


const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const createUser = async ({ name, email, password, photoURL }) => {
    setLoading(true);
    const res = await createUserWithEmailAndPassword(auth, email, password);
    // set displayName and photo
    if (name || photoURL) {
      await updateProfile(res.user, { displayName: name || null, photoURL: photoURL || null });
      // refresh local user
      setUser({ ...res.user, displayName: name, photoURL });
    }
    setLoading(false);
    return res.user;
  };

  // Login
  const signIn = async (email, password) => {
    setLoading(true);
    const res = await signInWithEmailAndPassword(auth, email, password);
    setLoading(false);
    return res.user;
  };

  // Google sign-in
  const googleSignIn = async () => {
    setLoading(true);
    const res = await signInWithPopup(auth, googleProvider);
    setLoading(false);
    return res.user;
  };

  // Logout
  const logout = async () => {
    setLoading(true);
    await signOut(auth);
    setLoading(false);
  };

  // Subscribe to auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (current) => {
      setUser(current);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { user, loading, createUser, signIn, googleSignIn, logout, auth };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
