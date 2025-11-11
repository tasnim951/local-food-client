import React, { useEffect, useState } from 'react';

function AllReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/allreviews')  
      .then(res => res.json())
      .then(data => {
        setReviews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch all reviews:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading all reviews...</p>;
  }

  return (
    <section
      style={{
        padding: '50px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#333',
        
        minHeight: '100vh',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '50px', fontWeight: '700', fontSize: '2.8rem', fontFamily: "'poppins'", color: '#365849ff' }}>
        All Reviews
      </h2>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {reviews.map((review, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '25px',
              marginBottom: '35px',
              border: '1px solid #ddd',
              borderRadius: '15px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              backgroundColor: '#fff',
            }}
          >
            <img
              src={review.photo}
              alt={review.foodName}
              style={{
                width: '180px',
                height: '130px',
                objectFit: 'cover',
                borderRadius: '15px',
                marginRight: '30px',
                flexShrink: 0,
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#2d6a4f', fontSize: '1.8rem' }}>
                {review.foodName}
              </h3>
              <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#386641', fontSize: '1.1rem' }}>
                {review.restaurantName}
              </p>
              <p
                style={{
                  margin: '0 0 8px 0',
                  fontStyle: 'italic',
                  color: '#52796f',
                  fontSize: '1rem',
                }}
              >
                Reviewed by {review.reviewerName} on{' '}
                {new Date(review.reviewDate).toLocaleDateString()}
              </p>
             
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AllReviews;
