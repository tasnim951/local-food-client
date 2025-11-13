import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function EditReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`http://localhost:5000/reviews/${id}`);
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
      const res = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      });

      const data = await res.json(); 

      if (!res.ok) throw new Error(data.message || "Failed to update review.");

      toast.success("Review updated successfully!");

    
      setTimeout(() => {
        navigate("/my-reviews");
      }, 500);

    } catch (error) {
      toast.error(error.message);
    }
  };

  if (loading) {
    return <p 
    style={{ textAlign: "center",
        
    marginTop: "100px" }}>
        Loading...</p>;
  }

  if (!review) {
    return <p
     style={{ textAlign: "center",
         marginTop: "100px" }}>
            Review not found.</p>;
  }

  return (
    <div 
    style={{ maxWidth: "600px",
     margin: "40px auto",
      padding: "20px" }}>

      <h2
       style={{ textAlign: "center", color: "#2d6a4f" }}>Edit Review</h2>
      <form 
      onSubmit={handleSubmit} style={formStyle}>
        <label
         style={labelStyle}>Food Name</label>
        <input
          type="text"
          name="foodName"
          value={review.foodName || ""}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label 
        style={labelStyle}>Restaurant Name</label>
       
        <input
          type="text"
          name="restaurantName"
          value={review.restaurantName || ""}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label
         style={labelStyle}>Food Image URL</label>
        
         <input
          type="text"
          name="foodImage"
          value={review.foodImage || ""}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label 
        
        style={labelStyle}>
            Location</label>
        <input
          type="text"
          name="location"
          value={review.location || ""}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label  
        
        style={labelStyle}>Star Rating</label>
         
         <input
          type="number"
          name="starRating"
          min="1"
          max="5"
          value={review.starRating || ""}
          onChange={handleChange}
          style={inputStyle}
          required
        />

        <label style={labelStyle}>Your Review</label>
        <textarea
          name="reviewText"
          value={review.reviewText || ""}
          onChange={handleChange}
          style={textareaStyle}
          required
        />

        <button type="submit" style={buttonStyle}>
          Update Review
        </button>
      </form>
    </div>
  );
}


           const formStyle = {
                         display: "flex",
                      flexDirection: "column",
                        gap: "12px",
                             marginTop: "20px",
};

           const labelStyle = {
                         fontWeight: "bold",
                 color: "#2d6a4f",
           };

                    const inputStyle = {
                               padding: "10px",
                         border: "1px solid #ccc",
                           borderRadius: "8px",
          };

        const textareaStyle = {
         padding: "10px",
          border: "1px solid #ccc",
     borderRadius: "8px",
      minHeight: "100px",
      };

                const buttonStyle = {
          backgroundColor: "#2d6a4f",
                color: "white",
                border: "none",
                padding: "10px",
               borderRadius: "8px",
                 cursor: "pointer",
           marginTop: "10px",
           };
