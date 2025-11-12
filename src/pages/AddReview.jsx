import React, { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";

export default function AddReview() {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    restaurantName: "",
    location: "",
    starRating: "",
    reviewText: "",
  });
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "100px", fontSize: "18px" }}>
        Please <a href="/login">login</a> to add a review.
      </p>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.foodName ||
      !formData.foodImage ||
      !formData.restaurantName ||
      !formData.location ||
      !formData.starRating ||
      !formData.reviewText
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    const reviewData = {
      ...formData,
      userEmail: user.email,
      reviewDate: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) {
        throw new Error("Failed to add review.");
      }

      toast.success("Review added successfully!");
      setFormData({
        foodName: "",
        foodImage: "",
        restaurantName: "",
        location: "",
        starRating: "",
        reviewText: "",
      });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
      }}
    >
      <h2
        style={{ textAlign: "center", marginBottom: "20px", color: "#2d6a4f" }}
      >
        Add Your Food Review 🍽
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <input
          name="foodName"
          value={formData.foodName}
          onChange={handleChange}
          placeholder="Food Name"
          style={inputStyle}
          required
          disabled={loading}
        />
        <input
          name="foodImage"
          value={formData.foodImage}
          onChange={handleChange}
          placeholder="Food Image URL"
          style={inputStyle}
          required
          disabled={loading}
        />
        <input
          name="restaurantName"
          value={formData.restaurantName}
          onChange={handleChange}
          placeholder="Restaurant Name"
          style={inputStyle}
          required
          disabled={loading}
        />
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          style={inputStyle}
          required
          disabled={loading}
        />

        <select
          name="starRating"
          value={formData.starRating}
          onChange={handleChange}
          style={inputStyle}
          required
          disabled={loading}
        >
          <option value="">Select Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>

        <textarea
          name="reviewText"
          value={formData.reviewText}
          onChange={handleChange}
          placeholder="Write your review..."
          rows="5"
          style={{ ...inputStyle, resize: "none" }}
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#2d6a4f",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "16px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.background = "#40916c";
          }}
          onMouseOut={(e) => {
            if (!loading) e.currentTarget.style.background = "#2d6a4f";
          }}
        >
          {loading ? "Submitting..." : "Add Review"}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
};
