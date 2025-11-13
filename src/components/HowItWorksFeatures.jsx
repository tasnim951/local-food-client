import React from "react";
import { FaSearchLocation, FaTruck, FaShieldAlt, FaSmile } from "react-icons/fa";

const features = [
  {
    icon: <FaSearchLocation color="#2d6a4f" size={40} />,
    title: "Easy Food Search",
    desc: "Quickly find your favorite local dishes and restaurants with our intuitive search.",
  },
  {
    icon: <FaTruck color="#2d6a4f" size={40} />,
    title: "Fast Delivery",
    desc: "Get your food delivered quickly and safely to your doorstep every time.",
  },
  {
    icon: <FaShieldAlt color="#2d6a4f" size={40} />,
    title: "Secure Payments",
    desc: "Your transactions are protected with the latest security standards and encryption.",
  },
  {
    icon: <FaSmile color="#2d6a4f" size={40} />,
    title: "User Friendly",
    desc: "Designed to be simple and accessible for all users, making your experience enjoyable.",
  },
];

export default function HowItWorksFeatures() {
  return (
    <section
      className="how-it-works"
      style={{
        backgroundColor: "#ffffff", 
        padding: "60px 20px",
        maxWidth: "1000px",
        margin: "40px auto",
        borderRadius: "12px",
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box",
        boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
      }}
    >
      
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h3
          style={{
            color: "#2d6a4f",
            fontSize: "2rem",
            fontWeight:  "600",
            letterSpacing: "2px",
            margin: 0,
          }}
        >
          HOW IT WORK
        </h3>
        <h1
          style={{
            color: "#2d6a4f",
            fontSize: "3rem",
            fontWeight: "900",
            marginTop: "8px",
            letterSpacing: "2px",
            marginBottom: 0,
          }}
        >
          FOODIAN THEME FEATURES
        </h1>
      </div>

    
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {features.map(({ icon, title, desc }, index) => (
          <div
            key={index}
            style={{
              flex: "1 1 250px",
              backgroundColor: "#f7fdf5",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ marginBottom: "15px" }}>{icon}</div>
            <h4
              style={{
                margin: 0,
                fontWeight: "700",
                fontSize: "1.3rem",
                color: "#2d6a4f",
                marginBottom: "10px",
              }}
            >
              {title}
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: "1rem",
                lineHeight: "1.5",
                color: "#555",
              }}
            >
              {desc}
            </p>
          </div>
        ))}
      </div>

    
         <style>
        {`
          @media (max-width: 768px) {
            .how-it-works h1 {
              font-size: 2rem;
            }
            .how-it-works h3 {
              font-size: 1.2rem;
            }
            .how-it-works p {
              font-size: 0.9rem;
            }
          }
        `}
      </style>
    </section>
  );
}
