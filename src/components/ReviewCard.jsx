import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Modal from './Modal'; 

function ReviewCard({ loggedInUserEmail }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://local-food-server-rouge.vercel.app/reviews')
      .then(res => res.json())
      .then(data => {
        const filtered = loggedInUserEmail
          ? data.filter(review => review.userEmail !== loggedInUserEmail)
          : data;
        const limited = filtered.slice(0, 6);
        setReviews(limited);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch reviews:', err);
        setLoading(false);
      });
  }, [loggedInUserEmail]);

  const openModal = async (foodName) => {
    try {
      const res = await fetch(`https://local-food-server-rouge.vercel.app/details/${encodeURIComponent(foodName)}`);
      if (!res.ok) throw new Error('Details not found');
      const data = await res.json();
      setModalData(data);
      setModalOpen(true);
    } catch (err) {
      alert('Failed to fetch details');
      console.error(err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalData(null);
  };

  if (loading) {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Loading reviews...</p>;
  }

  return (
    <section
      style={{
        backgroundColor: '#e6f0e9',
        padding: '50px 20px',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        color: '#2d6a4f',
        minHeight: '100vh',
        marginTop: "10px",
        borderRadius: "8px",
        position:"relative",
       
      }}
    >
      <h2
        style={{
          fontSize: "2.5rem",
          fontWeight: "700",
          marginBottom: "40px",
          fontFamily: "'Poppins'",
          color: "#2d6a4f",
          position: "relative",
          display: "inline-block",
          paddingLeft: "50px",
          userSelect: "none",
        }}
      >
        FEATURED REVIEWS
        <span
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#2d6a4f",
            transform: "translateY(-50%)",
            boxShadow: "0 0 6px #95d5b2",
          }}
        ></span>
        <span
          style={{
            position: "absolute",
            left: "-15px",
            top: "50%",
            width: "30px",
            height: "3px",
            background: "#2d6a4f",
            borderRadius: "2px",
            transform: "translateY(-50%)",
            boxShadow: "0 0 8px #95d5b2",
          }}
        ></span>
      </h2>

      
        <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1100px',
          margin: '0 auto 50px',
        }}
      >
        {reviews.map((review, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              boxShadow: '0 8px 16px rgba(45, 106, 79, 0.2)',
              padding: '20px',
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.3s ease',
              cursor: 'default',
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <img
              src={review.photo}
              alt={review.foodName}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                borderRadius: '12px',
                marginBottom: '15px',
              }}
            />
            <h3 style={{ margin: '5px 0', color: '#2d6a4f' }}>{review.foodName}</h3>
            <p style={{ margin: '3px 0', fontWeight: '600', color: '#386641' }}>
              {review.restaurantName} — {review.location}
            </p>
            <p
              style={{
                fontStyle: 'italic',
                color: '#52796f',
                margin: '3px 0 10px 0',
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              Reviewed by {review.reviewerName}
            </p>
            <p
              style={{
                fontWeight: 'bold',
                color: '#1b4332',
                marginBottom: '15px',
              }}
            >
              Rating: {review.rating}
            </p>

            <button
              style={{
                backgroundColor: '#2d6a4f',
                color: 'white',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '30px',
                fontWeight: '600',
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#1b4332')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#2d6a4f')}
              onClick={() => openModal(review.foodName)}
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          style={{
            backgroundColor: '#386641',
            color: 'white',
            border: 'none',
            padding: '14px 40px',
            borderRadius: '50px',
            fontWeight: '700',
            fontSize: '1.1rem',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(56, 102, 65, 0.4)',
            transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          }}
           
          
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = '#2d6a4f';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(45, 106, 79, 0.6)';
          }}
          
          
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = '#386641';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(56, 102, 65, 0.4)';
          }}
         
         
          onClick={() => navigate('/allreviews')}
        >
          SHOW ALL
        </button>
      </div>

      {modalOpen && <Modal modalData={modalData} closeModal={closeModal} />}
    </section>
  );
}

export default ReviewCard;
