import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(
          `https://local-food-server-rouge.vercel.app/reviews/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch review.");
        const data = await res.json();
        setReview(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `https://local-food-server-rouge.vercel.app/reviews/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(review),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Review updated successfully!");
      setTimeout(() => navigate("/my-reviews"), 500);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const colors = {
    pageBg: darkMode ? "#3B2F2F" : "#FDF6F0",
    cardBg: darkMode ? "#5C4033" : "#FFFFFF",
    text: darkMode ? "#FDF6F0" : "#3B2F2F",
    inputBg: darkMode ? "#3B2F2F" : "#FFFFFF",
    border: "#D6C7B8",
    accent: "#8B5E3C",
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: 100, color: colors.text }}>
        Loading...
      </p>
    );
  }

  if (!review) {
    return (
      <p style={{ textAlign: "center", marginTop: 100, color: colors.text }}>
        Review not found.
      </p>
    );
  }

  return (
    <section
      style={{
        minHeight: "100vh",
        background: colors.pageBg,
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: 600,
          margin: "0 auto",
          background: colors.cardBg,
          padding: "30px 25px",
          borderRadius: 16,
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: 25,
            color: colors.text,
            fontSize: "2.2rem",
          }}
        >
          Edit Review
        </h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", gap: 14, flexDirection: "column" }}>
          {[
            { label: "Food Name", name: "foodName" },
            { label: "Restaurant Name", name: "restaurantName" },
            { label: "Food Image URL", name: "foodImage" },
            { label: "Location", name: "location" },
          ].map((field) => (
            <div key={field.name}>
              <label style={{ color: colors.text, fontWeight: 600 }}>
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={review[field.name] || ""}
                onChange={handleChange}
                required
                style={{
                  ...inputStyle,
                  background: colors.inputBg,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              />
            </div>
          ))}

          <div>
            <label style={{ color: colors.text, fontWeight: 600 }}>
              Star Rating
            </label>
            <input
              type="number"
              name="starRating"
              min="1"
              max="5"
              value={review.starRating || ""}
              onChange={handleChange}
              required
              style={{
                ...inputStyle,
                background: colors.inputBg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            />
          </div>

          <div>
            <label style={{ color: colors.text, fontWeight: 600 }}>
              Your Review
            </label>
            <textarea
              name="reviewText"
              value={review.reviewText || ""}
              onChange={handleChange}
              required
              style={{
                ...textareaStyle,
                background: colors.inputBg,
                color: colors.text,
                border: `1px solid ${colors.border}`,
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: colors.accent,
              color: "#fff",
              border: "none",
              padding: "12px",
              borderRadius: 30,
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: 10,
            }}
          >
            Update Review
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- shared styles ---------- */
const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  fontSize: "1rem",
  outline: "none",
  boxSizing: "border-box",   
};

const textareaStyle = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 10,
  minHeight: 110,
  resize: "none",
  fontSize: "1rem",
  boxSizing: "border-box",   
};

