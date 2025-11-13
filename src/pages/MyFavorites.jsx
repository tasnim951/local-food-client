import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';  
import { toast } from 'react-toastify';

export default function MyFavorites() {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/my-favorites/${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch favorites:', err);
        toast.error('Failed to load favorites.');
        setLoading(false);
      });
  }, [user?.email]);

  const handleRemoveFavorite = async (favoriteId) => {
    try {
      const res = await fetch(`http://localhost:5000/my-favorites/${favoriteId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Removed from favorites.');
        setFavorites(prev => prev.filter(fav => fav._id !== favoriteId));
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to remove favorite.');
      }
    } catch (error) {
      toast.error('Error removing favorite.');
      console.error(error);
    }
  };

  if (!user) {
    return (
      <p
       style={{ textAlign: 'center',
        marginTop: '100px', 
        fontSize: '18px' }}>

        Please <a href="/login">login</a> to view your favorites.
      </p>
    );
  }

  if (loading) {
    return <p style={{ textAlign: 'center',
         marginTop: '50px' }}>Loading your favorites...</p>;
  }

  if (favorites.length === 0) {
    return <p style={{ textAlign: 'center',
         marginTop: '50px' }}>You have no favorite reviews yet.</p>;
  }

  return (
    <section
      style={{
        padding: '40px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: '100vh',
        backgroundColor: '#f9f9f9',
        color: '#333',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontWeight: '700',
          fontSize: '2.8rem',
          color: '#365849ff',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        My Favorite Reviews
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {favorites.map((fav) => {
          const review = fav.review || {};
          return (
            <div
              key={fav._id}
              style={{
                backgroundColor: '#fff',
                borderRadius: '15px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img
                src={review.foodImage || review.photo || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={review.foodName || 'Food'}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                }}
              />
              <div 
              style={{ padding: '20px' }}>
                <h3 
                style={{ margin: '0 0 10px 0', color: '#2d6a4f', fontSize: '1.8rem' }}>
                  {review.foodName || 'Unknown Food'}
                </h3>

                <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#386641', fontSize: '1.2rem' }}>
                  {review.restaurantName || 'Unknown Restaurant'}
                </p>

                <p 
                
                style={{ margin: '0 0 12px 0',
                 color: '#52796f',
                  fontStyle: 'italic',
                  fontSize: '1rem' }}>
                  Favorited on {new Date(fav.favoritedAt).toLocaleDateString()}
                </p>

                <p 
                style={{ margin: '0 0 8px 0', 
                fontWeight: '600', 
                color: '#386641',
                 fontSize: '1.2rem' }}>
                  Reviewer: {review.reviewerName || 'Unknown Reviewer'}
                </p>

                <p 
                style={{ margin: '0 0 12px 0',
                 color: '#52796f', 
                 fontStyle: 'italic', 
                 fontSize: '1rem' }}>
                  Reviewed on: {review.reviewDate ? new Date(review.reviewDate).toLocaleDateString() : 'Date not available'}
                </p>

                <button
                  onClick={() => handleRemoveFavorite(fav._id)}
                  style={{
                    backgroundColor: '#e63946',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    fontWeight: '600',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    marginTop: '20px',
                    transition: 'background-color 0.3s',
                  }}
                  onMouseOver={e => (e.currentTarget.style.backgroundColor = '#b32d37')}
                  onMouseOut={e => (e.currentTarget.style.backgroundColor = '#e63946')}
                >
                  Remove Favorite
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
