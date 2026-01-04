import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [favoriteReviewIds, setFavoriteReviewIds] = useState(new Set());

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await fetch(
          "https://local-food-server-rouge.vercel.app/allreviews"
        );
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch {
        toast.error("Failed to load reviews");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserFavorites = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(
          `https://local-food-server-rouge.vercel.app/my-favorites/${encodeURIComponent(
            user.email
          )}`
        );
        if (!res.ok) return;
        const favoritesData = await res.json();
        setFavoriteReviewIds(
          new Set(favoritesData.map((fav) => fav.review?._id))
        );
      } catch {}
    };

    fetchAllReviews();
    fetchUserFavorites();
  }, [user?.email]);

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "60px", color: "#4b3621" }}>
        Loading all reviews...
      </p>
    );

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>All Reviews</h2>

      <div style={containerStyle}>
        {reviews.map((review) => (
          <div key={review._id} className="review-card" style={cardStyle}>
            <img
              src={review.photo}
              alt={review.foodName}
              style={imageStyle}
            />

            <div style={contentStyle}>
              <h3 style={foodNameStyle}>{review.foodName}</h3>
              <p style={restaurantStyle}>{review.restaurantName}</p>
              <p style={reviewerStyle}>
                Reviewed by {review.reviewerName} on{" "}
                {new Date(review.reviewDate).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => handleFavorite(review._id)}
              style={favoriteButtonStyle(
                favoriteReviewIds.has(review._id)
              )}
              aria-label="Add to favorites"
            >
              {favoriteReviewIds.has(review._id) ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          .review-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .review-card img {
            width: 100%;
            height: 180px;
            margin-right: 0;
            margin-bottom: 14px;
          }
        }
      `}</style>
    </section>
  );

  async function handleFavorite(reviewId) {
    if (!user?.email) return toast.error("Please login to add favorites!");
    try {
      const res = await fetch(
        "https://local-food-server-rouge.vercel.app/my-favorites",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userEmail: user.email, reviewId }),
        }
      );

      if (res.status === 201) {
        toast.success("Added to favorites!");
        setFavoriteReviewIds((prev) => new Set(prev).add(reviewId));
      } else if (res.status === 409) {
        toast.info("Already in favorites");
      }
    } catch {
      toast.error("Error adding to favorites");
    }
  }
}

export default AllReviews;

/* ---------- STYLES ---------- */

const sectionStyle = {
  padding: "60px 20px",
  minHeight: "100vh",
  backgroundColor: "#f5efe8",
  fontFamily: "'Poppins', sans-serif",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: "50px",
  fontSize: "2.8rem",
  fontWeight: "800",
  color: "#4b3621", // ☕ coffee themed
};

const containerStyle = {
  maxWidth: "1000px",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "26px",
};

const cardStyle = {
  display: "flex",
  gap: "26px",
  padding: "22px",
  backgroundColor: "#fff",
  borderRadius: "18px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  position: "relative",
};

const imageStyle = {
  width: "200px",
  height: "140px",
  objectFit: "cover",
  borderRadius: "14px",
  flexShrink: 0,
};

const contentStyle = { flex: 1 };

const foodNameStyle = {
  margin: "0 0 8px",
  fontSize: "1.7rem",
  color: "#2b1d14",
};

const restaurantStyle = {
  margin: "0 0 6px",
  fontWeight: "600",
  color: "#7a5a43",
};

const reviewerStyle = {
  margin: 0,
  fontStyle: "italic",
  color: "#7a5a43",
};

const favoriteButtonStyle = (active) => ({
  position: "absolute",
  top: "18px",
  right: "18px",
  background: "none",
  border: "none",
  fontSize: "2rem",
  cursor: "pointer",
  color: active ? "#c0392b" : "#b0a59a",
});
