import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import Modal from "./Modal";
import { ThemeContext } from "../contexts/ThemeProvider";

function ReviewCard({ loggedInUserEmail }) {
  const { darkMode } = useContext(ThemeContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://local-food-server-rouge.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => {
        const filtered = loggedInUserEmail
          ? data.filter((r) => r.userEmail !== loggedInUserEmail)
          : data;
        setReviews(filtered.slice(0, 6));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [loggedInUserEmail]);

  const openModal = async (foodName) => {
    try {
      const res = await fetch(
        `https://local-food-server-rouge.vercel.app/details/${encodeURIComponent(foodName)}`
      );
      const data = await res.json();
      setModalData(data);
      setModalOpen(true);
    } catch {
      alert("Failed to fetch details");
    }
  };

  if (loading) {
    return (
      <p style={{ textAlign: "center", marginTop: "80px" }}>
        Loading reviews...
      </p>
    );
  }

  /* ===== COFFEE THEME ===== */
  const colors = darkMode
    ? {
        sectionBg: "#3B2F2F",
        cardBg: "#FDF6F0",
        text: "#2A1A12",
        subText: "#6B4A3A",
        button: "#8B5E3C",
        buttonHover: "#6F4E37",
      }
    : {
        sectionBg: "#FDF6F0",
        cardBg: "#FFFFFF",
        text: "#3B2F2F",
        subText: "#6B4A3A",
        button: "#6F4E37",
        buttonHover: "#5A3E2B",
      };

  return (
   <section
  style={{
    backgroundColor: colors.sectionBg,
    padding: "70px 20px",
    marginTop: "80px", 
    transition: "background-color 0.3s ease",
  }}
>
  <h2
    style={{
      maxWidth: "1300px",
      margin: "0 auto 50px",
      fontSize: "2.6rem",
      fontWeight: 700,
      color: darkMode ? "#FFFFFF" : colors.text, 
      transition: "color 0.3s ease",
    }}
  >
    Featured Reviews
  </h2>

  <div
    style={{
      maxWidth: "1300px",
      margin: "0 auto 60px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
      gap: "30px",
    }}
  >
    {reviews.map((review, idx) => (
      <div
        key={idx}
        style={{
          backgroundColor: colors.cardBg,
          borderRadius: "18px",
          padding: "22px",
          boxShadow: darkMode
            ? "0 12px 28px rgba(0,0,0,0.45)"
            : "0 10px 20px rgba(0,0,0,0.12)",
          transition: "0.3s",
        }}
      >
        <img
          src={review.photo}
          alt={review.foodName}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "14px",
            marginBottom: "16px",
          }}
        />

        <h3 style={{ color: colors.text }}>{review.foodName}</h3>

        <p style={{ fontWeight: 600, color: colors.subText }}>
          {review.restaurantName} — {review.location}
        </p>

        <p style={{ fontStyle: "italic", color: colors.subText }}>
          Reviewed by {review.reviewerName}
        </p>

        <p style={{ fontWeight: "bold", color: colors.text }}>
          Rating: {review.rating}
        </p>

        <button
          onClick={() => openModal(review.foodName)}
          style={{
            marginTop: "14px",
            backgroundColor: colors.button,
            color: "#fff",
            border: "none",
            padding: "11px 28px",
            borderRadius: "30px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = colors.buttonHover)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = colors.button)
          }
        >
          View Details
        </button>
      </div>
    ))}
  </div>

  <div style={{ textAlign: "center" }}>
    <button
      onClick={() => navigate("/allreviews")}
      style={{
        backgroundColor: colors.button,
        color: "#fff",
        border: "none",
        padding: "15px 48px",
        borderRadius: "50px",
        fontSize: "1.1rem",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      Show All
    </button>
  </div>

  {modalOpen && <Modal modalData={modalData} closeModal={() => setModalOpen(false)} />}
</section>

  );
}

export default ReviewCard;
