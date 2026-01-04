import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { ThemeContext } from "../contexts/ThemeProvider"; 
import { toast } from "react-toastify";

export default function AddReview() {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext); 
  const [formData, setFormData] = useState({
    foodName: "",
    foodImage: "",
    restaurantName: "",
    location: "",
    starRating: "",
    reviewText: "",
  });
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#3B2F2F" : "#FDF6F0";
    document.body.style.color = darkMode ? "#FDF6F0" : "#3B2F2F";
  }, [darkMode]);

  if (!user) {
    return (
      <p
        style={{
          textAlign: "center",
          marginTop: "100px",
          fontSize: "18px",
          color: darkMode ? "#FDF6F0" : "#3B2F2F",
        }}
      >
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
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "https://local-food-server-rouge.vercel.app";

      const res = await fetch(`${API_BASE_URL}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (!res.ok) throw new Error("Failed to add review.");

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

  const bgColor = darkMode ? "#5C4033" : "#FFFFFF";
  const textColor = darkMode ? "#FDF6F0" : "#3B2F2F";
  const inputBg = darkMode ? "#3B2F2F" : "#fff";
  const inputBorder = darkMode ? "#8B5E3C" : "#ccc";
  const buttonBg = "#8B5E3C";
  const buttonHover = "#A67C52";

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        padding: "20px",
        background: bgColor,
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        color: textColor,
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: textColor,
        }}
      >
        Add Your Food Review 🍽
      </h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "15px" }}
      >
        {["foodName", "foodImage", "restaurantName", "location"].map(
          (field) => (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
              style={{
                ...inputStyle,
                background: inputBg,
                border: `1px solid ${inputBorder}`,
                color: textColor,
              }}
              required
              disabled={loading}
            />
          )
        )}

        <select
          name="starRating"
          value={formData.starRating}
          onChange={handleChange}
          style={{
            ...inputStyle,
            background: inputBg,
            border: `1px solid ${inputBorder}`,
            color: textColor,
          }}
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
          style={{
            ...inputStyle,
            resize: "none",
            background: inputBg,
            border: `1px solid ${inputBorder}`,
            color: textColor,
          }}
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            background: buttonBg,
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
            fontSize: "16px",
            border: "none",
            cursor: loading ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
          onMouseOver={(e) => {
            if (!loading) e.currentTarget.style.background = buttonHover;
          }}
          onMouseOut={(e) => {
            if (!loading) e.currentTarget.style.background = buttonBg;
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
  fontSize: "16px",
};
