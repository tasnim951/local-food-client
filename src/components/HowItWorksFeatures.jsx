import React from "react";
import { FaSearchLocation, FaClipboardList, FaSmile, FaTruck, FaStar, FaMobileAlt, FaShieldAlt, FaUserFriends } from "react-icons/fa";

const features = [
  {
    icon: <FaSearchLocation color="#2d6a4f" size={40} />,
    title: "Easy Food Search",
    desc: "Quickly find your favorite local dishes and restaurants with our intuitive search feature.",
  },
  {
    icon: <FaClipboardList color="#2d6a4f" size={40} />,
    title: "Order Management",
    desc: "Track your orders easily and manage your favorites with a simple and clear interface.",
  },
  {
    icon: <FaSmile color="#2d6a4f" size={40} />,
    title: "User Friendly",
    desc: "Designed to be simple and accessible for all users, making your experience enjoyable.",
  },
  {
    icon: <FaTruck color="#2d6a4f" size={40} />,
    title: "Fast Delivery",
    desc: "Get your food delivered quickly and safely to your doorstep every time.",
  },
  {
    icon: <FaStar color="#2d6a4f" size={40} />,
    title: "Top Rated",
    desc: "We feature the best rated foods and restaurants, ensuring quality choices for you.",
  },
  {
    icon: <FaMobileAlt color="#2d6a4f" size={40} />,
    title: "Mobile Optimized",
    desc: "Enjoy seamless experience on any device, whether you’re on a phone or desktop.",
  },
  {
    icon: <FaShieldAlt color="#2d6a4f" size={40} />,
    title: "Secure Payments",
    desc: "Your transactions are protected with the latest security standards and encryption.",
  },
  {
    icon: <FaUserFriends color="#2d6a4f" size={40} />,
    title: "Community Driven",
    desc: "Join a community of food lovers and share your favorite finds and reviews.",
  },
];

export default function HowItWorksFeatures() {
  return (
    <section
      style={{
        backgroundColor: "#dff7e1",  
        padding: "60px 40px",
        maxWidth: "1200px",
        margin: "40px auto",
        borderRadius: "12px",
        fontFamily: "'Poppins', sans-serif",
        boxSizing: "border-box",
      }}
    >
     
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <h3 style={{ color: "#2d6a4f", fontSize: "2rem", fontWeight: "600", letterSpacing: "2px", margin: 0 }}>
          HOW IT WORK
        </h3>
        <h1
          style={{
            color: "#2d6a4f",
            fontSize: "3.5rem",
            fontWeight: "900",
            marginTop: "8px",
            letterSpacing: "4px",
            marginBottom: 0,
          }}
        >
          FOODIAN THEME FEATURES
        </h1>
      </div>

     
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(2, auto)",
          borderTop: "1px solid #2d6a4f",
          borderLeft: "1px solid #2d6a4f",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        {features.map(({ icon, title, desc }, index) => (
          <div
            key={index}
            style={{
              borderRight: "1px solid #2d6a4f",
              borderBottom: "1px solid #2d6a4f",
              padding: "25px 20px",
              display: "flex",
              gap: "15px",
              alignItems: "flex-start",
              backgroundColor: "transparent", 
              boxSizing: "border-box",
            }}
          >
            <div>{icon}</div>
            <div>
              <h4
                style={{
                  margin: 0,
                  fontWeight: "700",
                  fontSize: "1.3rem",
                  color: "#2d6a4f",
                  marginBottom: "8px",
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
                  maxWidth: "280px",
                }}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}