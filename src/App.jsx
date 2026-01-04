import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddReview from "./pages/AddReview";
import MyReviews from "./pages/MyReviews";
import AllReviews from "./pages/AllReviews";
import MyFavorites from "./pages/MyFavorites";
import NotFound from "./pages/NotFound";
import EditReview from "./pages/EditReview"; 

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#3B2F2F" : "#FDF6F0";
    document.body.style.color = darkMode ? "#FDF6F0" : "#3B2F2F";
  }, [darkMode]);

  function Layout() {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <main style={{ flex: 1, marginTop: "60px", paddingBottom: "60px", minHeight: "calc(100vh - 120px)" }}>
          <Outlet />
        </main>
        <Footer darkMode={darkMode} />
      </div>
    );
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home darkMode={darkMode} /> },
        { path: "/login", element: <Login darkMode={darkMode} /> },
        { path: "/register", element: <Register darkMode={darkMode} /> },
        { path: "/add-review", element: <AddReview darkMode={darkMode} /> },
        { path: "/my-reviews", element: <MyReviews darkMode={darkMode} /> },
        { path: "/allreviews", element: <AllReviews darkMode={darkMode} /> },
        { path: "/my-favorites", element: <MyFavorites darkMode={darkMode} /> },
        { path: "/edit-review/:id", element: <EditReview darkMode={darkMode} /> },
        { path: "*", element: <NotFound darkMode={darkMode} /> },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" autoClose={4000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </>
  );
}
