import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function MyReviews() {
  const { user } = useContext(AuthContext);
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
    setLoading(true);
    try {
      const res = await fetch(
       ` https://local-food-server-rouge.vercel.app/my-reviews/${encodeURIComponent(user.email)}`
      );
      if (!res.ok) throw new Error("Failed to fetch reviews.");
      const data = await res.json();
      setReviews(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (id) => {
    setDeleteReviewId(id);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setDeleteReviewId(null);
  };

  const confirmDelete = async () => {
    if (!deleteReviewId) return;
    try {
      const res = await fetch(`https://local-food-server-rouge.vercel.app/reviews/${deleteReviewId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete review.");
      toast.success("Review deleted successfully.");
      setReviews(reviews.filter((r) => r._id !== deleteReviewId));
    } catch (error) {
      toast.error(error.message);
    } finally {
      closeDeleteModal();
    }
  };

  if (!user) {
    return (
      <p style={{ textAlign: "center", marginTop: "100px", fontSize: "18px" }}>
        Please <a href="/login">login</a> to see your reviews.
      </p>
    );
  }

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "100px" }}>Loading...</p>;
  }

  return (
    <div
     style={{ maxWidth: "900px",
      margin: "40px auto", 
      
      padding: "20px" }}>

      <h2 style={{ textAlign: "center",
        
        color: "#2d6a4f",
         marginBottom: "20px" }}>
        My Reviews
      </h2>

      {reviews.length === 0 ? (
        <p style={{ textAlign: "center" }}>You have not added any reviews yet.</p>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Food Image</th>
              <th style={thStyle}>Food Name</th>
              <th style={thStyle}>Restaurant Name</th>
              <th style={thStyle}>Posted Date</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td style={tdStyle}>
                  <img
                    src={review.foodImage || "/placeholder.png"}
                    alt={review.foodName || "Food Image"}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                    onError={(e) => (e.target.src = "/placeholder.png")}
                  />
                </td>
                <td style={tdStyle}>{review.foodName || "N/A"}</td>
                <td style={tdStyle}>{review.restaurantName || "N/A"}</td>
                <td style={tdStyle}>
                  {review.reviewDate
                    ? new Date(review.reviewDate).toLocaleDateString()
                    : "N/A"}
                </td>
                <td style={tdStyle}>
                  <button
                    style={editButtonStyle}
                    onClick={() => navigate(`/edit-review/${review._id}`)}
                  >
                    Edit
                  </button>
                  <button
                    style={deleteButtonStyle}
                    onClick={() => openDeleteModal(review._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {deleteModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <p>Are you sure you want to delete this review?</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <button onClick={confirmDelete}
               style={confirmButtonStyle}>
                Confirm
              </button>
              <button onClick={closeDeleteModal} style={cancelButtonStyle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


const tableStyle = { width: "100%", borderCollapse: "collapse" };
const thStyle = {
  borderBottom: "2px solid #2d6a4f",
  padding: "10px",
  textAlign: "left",
  color: "#2d6a4f",
};
const tdStyle = { borderBottom: "1px solid #ccc", padding: "10px", verticalAlign: "middle" };
const editButtonStyle = {
  backgroundColor: "#40916c",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "10px",
};
const deleteButtonStyle = {
  backgroundColor: "#d00000",
  color: "white",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};
const modalContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "12px",
  maxWidth: "400px",
  width: "90%",
  boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  textAlign: "center",
};
const confirmButtonStyle = {
  backgroundColor: "#d00000",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};
const cancelButtonStyle = {
  backgroundColor: "#aaa",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "8px",
  cursor: "pointer",
};
