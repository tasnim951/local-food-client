import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [favoriteReviewIds, setFavoriteReviewIds] = useState(new Set());

  useEffect(() => {
    const fetchAllReviews = async () => {
      try {
        const res = await fetch('https://local-food-server-rouge.vercel.app/allreviews');
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        toast.error('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserFavorites = async () => {
      if (!user?.email) return;
      try {
        const res = await fetch(`https://local-food-server-rouge.vercel.app/my-favorites/${encodeURIComponent(user.email)}`);
        if (!res.ok) throw new Error('Failed to fetch favorites');
        const favoritesData = await res.json();
        const favIds = new Set(favoritesData.map(fav => fav.review?._id));
        setFavoriteReviewIds(favIds);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllReviews();
    fetchUserFavorites();
  }, [user?.email]);

  if (loading) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading all reviews...</p>;

  const handleFavorite = async (reviewId) => {
    if (!user?.email) return toast.error('Please login to add favorites!');
    try {
      const res = await fetch('https://local-food-server-rouge.vercel.app/my-favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userEmail: user.email, reviewId }),
      });
      if (res.status === 201) {
        toast.success('Added to favorites!');
        setFavoriteReviewIds(prev => new Set(prev).add(reviewId));
      } else if (res.status === 409) {
        toast.info('Already in favorites');
      } else {
        const data = await res.json().catch(() => ({}));
        toast.error(data.message || 'Failed to add favorite');
      }
    } catch {
      toast.error('Error adding to favorites');
    }
  };

  return (
    <section style={sectionStyle}>
      <h2 style={titleStyle}>All Reviews</h2>
      <div style={containerStyle}>
        {reviews.map((review) => (
          <div key={review._id} style={cardStyle}>
            <img
              src={review.photo}
              alt={review.foodName}
              style={imageStyle}
            />
            <div style={contentStyle}>
              <h3 style={foodNameStyle}>{review.foodName}</h3>
              <p style={restaurantStyle}>{review.restaurantName}</p>
              <p style={reviewerStyle}>
                Reviewed by {review.reviewerName} on{' '}
                {new Date(review.reviewDate).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => handleFavorite(review._id)}
              style={favoriteButtonStyle(favoriteReviewIds.has(review._id))}
              aria-label="Add to favorites"
              title="Add to favorites"
            >
              {favoriteReviewIds.has(review._id) ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div>
        ))}
      </div>

      {/* Media query for small screens */}
      <style>{`
        @media (max-width: 600px) {
          .review-card {
            flex-direction: column !important;
            align-items: center !important;
          }
          .review-card img {
            width: 100% !important;
            height: auto !important;
            margin-right: 0 !important;
            margin-bottom: 15px !important;
          }
          .review-card h3 {
            font-size: 1.4rem !important;
          }
          .review-card p {
            font-size: 0.95rem !important;
          }
          .review-card button {
            top: 10px !important;
            right: 10px !important;
          }
        }
      `}</style>
    </section>
  );
}

export default AllReviews;

// ---------- Styles ----------
const sectionStyle = {
  padding: '50px 20px',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
  minHeight: '100vh',
};

const titleStyle = {
  textAlign: 'center',
  marginBottom: '50px',
  fontWeight: '700',
  fontSize: '2.8rem',
  fontFamily: "'Poppins'",
  color: '#365849ff',
};

const containerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '25px',
};

const cardStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '25px',
  border: '1px solid #ddd',
  borderRadius: '15px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  backgroundColor: '#fff',
  position: 'relative',
  flexWrap: 'wrap',
};

const imageStyle = {
  width: '180px',
  height: '130px',
  objectFit: 'cover',
  borderRadius: '15px',
  marginRight: '30px',
  flexShrink: 0,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
};

const contentStyle = { flex: 1 };

const foodNameStyle = { margin: '0 0 10px 0', color: '#2d6a4f', fontSize: '1.8rem' };
const restaurantStyle = { margin: '0 0 8px 0', fontWeight: '600', color: '#386641', fontSize: '1.1rem' };
const reviewerStyle = { margin: '0 0 8px 0', fontStyle: 'italic', color: '#52796f', fontSize: '1rem' };

const favoriteButtonStyle = (active) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontSize: '2rem',
  color: active ? '#e63946' : '#999',
  position: 'absolute',
  right: '20px',
  top: '20px',
  transition: 'color 0.3s',
});
