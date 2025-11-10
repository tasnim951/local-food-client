import React from "react";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddReview from "./pages/AddReview";
import MyReviews from "./pages/MyReviews";
import AllReviews from "./pages/AllReviews";
import MyFavorites from "./pages/MyFavorites";
import NotFound from "./pages/NotFound";
import ReviewCard from "./components/ReviewCard";

function Layout() {
  return (
    <div
      style={{
        background: "linear-gradient(90deg, #6fcf97 0%, #ffffff 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
          paddingBottom: "60px",
          marginTop: "60px",
          minHeight: "calc(100vh - 120px)",
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "add-review", element: <AddReview /> },
      { path: "my-reviews", element: <MyReviews /> },
      { path: "allreviews", element: <AllReviews /> },
      { path: "my-favorites", element: <MyFavorites /> },
      {path : "review-card", element: <ReviewCard/>},
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}