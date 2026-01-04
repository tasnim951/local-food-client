import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { ThemeContext } from "../contexts/ThemeProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function MyReviews() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteReviewId, setDeleteReviewId] = useState(null);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetchReviews();
  }, [user]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `https://local-food-server-rouge.vercel.app/my-reviews/${encodeURIComponent(
          user.email
        )}`
      );
      if (!res.ok) throw new Error("Failed to fetch reviews");
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(
        `https://local-food-server-rouge.vercel.app/reviews/${deleteReviewId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Review deleted");
      setReviews(reviews.filter((r) => r._id !== deleteReviewId));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const colors = {
    bg: darkMode ? "#3B2F2F" : "#FDF6F0",
    card: darkMode ? "#5C4033" : "#FFFFFF",
    text: darkMode ? "#FDF6F0" : "#3B2F2F",
    border: "#D6C7B8",
    coffee: "#8B5E3C",
    danger: "#B23A3A",
  };

  if (!user)
    return <p style={{ textAlign: "center", marginTop: 80 }}>Please login</p>;

  if (loading)
    return <p style={{ textAlign: "center", marginTop: 80 }}>Loading…</p>;

  return (
    <section style={{ background: colors.bg, minHeight: "100vh", padding: "40px 20px" }}>
      <h2 style={{ textAlign: "center", color: colors.text, fontSize: "2.5rem", marginBottom: 30 }}>
        My Reviews
      </h2>

      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        {reviews.length === 0 ? (
          <p style={{ textAlign: "center", color: colors.text }}>
            You have not added any reviews yet.
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                background: colors.card,
                borderRadius: 14,
                padding: 20,
                marginBottom: 20,
                display: "flex",
                gap: 20,
                alignItems: "center",
                flexWrap: "wrap",
                boxShadow: "0 6px 16px rgba(0,0,0,0.15)",
              }}
            >
              <img
                src={review.foodImage}
                alt={review.foodName}
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 12,
                  objectFit: "cover",
                }}
              />

              <div style={{ flex: 1, color: colors.text }}>
                <h3 style={{ margin: 0 }}>{review.foodName}</h3>
                <p style={{ margin: "4px 0" }}>{review.restaurantName}</p>
                <p style={{ fontSize: 14 }}>
                  {new Date(review.reviewDate).toLocaleDateString()}
                </p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={{
                    background: colors.coffee,
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/edit-review/${review._id}`)}
                >
                  Edit
                </button>
                <button
                  style={{
                    background: colors.danger,
                    color: "#fff",
                    border: "none",
                    padding: "8px 14px",
                    borderRadius: 20,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setDeleteReviewId(review._id);
                    setDeleteModalOpen(true);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {deleteModalOpen && (
        <div style={modalOverlay}>
          <div style={{ ...modalBox, background: colors.card, color: colors.text }}>
            <p>Are you sure you want to delete this review?</p>
            <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
              <button onClick={confirmDelete} style={{ ...btn, background: colors.danger }}>
                Confirm
              </button>
              <button
                onClick={() => setDeleteModalOpen(false)}
                style={{ ...btn, background: colors.coffee }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- helpers ---------- */
const modalOverlay = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const modalBox = {
  padding: 25,
  borderRadius: 14,
  maxWidth: 360,
  width: "90%",
  textAlign: "center",
};

const btn = {
  border: "none",
  color: "#fff",
  padding: "10px 18px",
  borderRadius: 20,
  cursor: "pointer",
};
