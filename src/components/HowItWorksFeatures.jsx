import React, { useContext } from "react";
import { FaSearchLocation, FaTruck, FaShieldAlt, FaSmile } from "react-icons/fa";
import { ThemeContext } from "../contexts/ThemeProvider";

const features = [
  {
    icon: <FaSearchLocation size={40} />,
    title: "Easy Food Search",
    desc: "Quickly find your favorite local dishes and restaurants with our intuitive search.",
  },
  {
    icon: <FaTruck size={40} />,
    title: "Fast Delivery",
    desc: "Get your food delivered quickly and safely to your doorstep every time.",
  },
  {
    icon: <FaShieldAlt size={40} />,
    title: "Secure Payments",
    desc: "Your transactions are protected with the latest security standards and encryption.",
  },
  {
    icon: <FaSmile size={40} />,
    title: "User Friendly",
    desc: "Designed to be simple and accessible for all users, making your experience enjoyable.",
    fullWidth: true,
  },
];

export default function HowItWorksFeatures() {
  const { darkMode } = useContext(ThemeContext);

  const bgColor = darkMode ? "#2c1b12" : "#fffaf0";
  const cardColor = darkMode ? "#3a2b1f" : "#f5f0e6";
  const textColor = darkMode ? "#fff" : "#4b2e2e";
  const iconColor = darkMode ? "#fff" : "#6f4e37";

  return (
    <section
      className="how-it-works"
      style={{
        backgroundColor: bgColor,
        padding: "50px 0", 
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "20px", 
        transition: "0.3s",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          width: "100%",
          padding: "0 20px", 
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h3
            style={{
              color: textColor,
              fontSize: "2rem",
              fontWeight: "600",
              letterSpacing: "2px",
              margin: 0,
            }}
          >
            HOW IT WORK
          </h3>
          <h1
            style={{
              color: textColor,
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

        {/* Feature Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          {features.map(({ icon, title, desc, fullWidth }, index) => (
            <div
              key={index}
              style={{
                backgroundColor: cardColor,
                borderRadius: "20px",
                padding: fullWidth ? "40px 30px" : "30px 20px",
                textAlign: "center",
                boxShadow: darkMode
                  ? "0 8px 20px rgba(0,0,0,0.3)"
                  : "0 6px 15px rgba(0,0,0,0.1)",
                flex: fullWidth ? "1 1 100%" : "1 1 auto",
                gridColumn: fullWidth ? "1 / -1" : "auto",
                transition: "0.3s",
              }}
            >
              <div style={{ marginBottom: "20px", color: iconColor }}>{icon}</div>
              <h4
                style={{
                  margin: 0,
                  fontWeight: "700",
                  fontSize: "1.5rem",
                  color: textColor,
                  marginBottom: "12px",
                }}
              >
                {title}
              </h4>
              <p
                style={{
                  margin: 0,
                  fontSize: "1.05rem",
                  lineHeight: "1.6",
                  color: darkMode ? "#ddd" : "#555",
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 1024px) {
          .how-it-works h1 { font-size: 2.5rem; }
          .how-it-works h3 { font-size: 1.5rem; }
        }
        @media (max-width: 768px) {
          .how-it-works h1 { font-size: 2rem; }
          .how-it-works h3 { font-size: 1.2rem; }
          .how-it-works p { font-size: 0.95rem; }
        }
      `}</style>
    </section>
  );
}
