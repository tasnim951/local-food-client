import React, { useContext } from "react";
import special1 from "../assets/special-1.jpg"; 
import { ThemeContext } from "../contexts/ThemeProvider";

export default function SpecialOffer() {
  const { darkMode } = useContext(ThemeContext);

  const bgColor = darkMode ? "#3B2F2F" : "#FDF6F0";
  const textColor = darkMode ? "#FFFFFF" : "#2d2d2d";
  const accentColor = darkMode ? "#8B5E3C" : "#8B5E3C";
  const buttonBg = darkMode ? "#8B5E3C" : "#8B5E3C";
  const buttonHover = darkMode ? "#6F4E37" : "#6F4E37";

  return (
    <section
      className="special-offer"
      style={{
        background: bgColor,
        padding: "40px 30px",
        maxWidth: "1400px",
        margin: "50px auto",
        borderRadius: "25px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "30px", 
        boxSizing: "border-box",
        boxShadow: darkMode ? "0 10px 50px rgba(0,0,0,0.4)" : "0 10px 30px rgba(0,0,0,0.15)",
      }}
    >
      {/* Text */}
      <div style={{ flex: "1 1 auto", minWidth: "280px", maxWidth: "650px" }}>
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: "14px",
            letterSpacing: "2px",
            marginBottom: "10px",
            color: accentColor,
          }}
        >
          Today's Special Offer
        </p>

        <h2
          style={{
            fontSize: "2.8rem",
            fontWeight: "900",
            margin: "0 0 15px",
            lineHeight: 1.1,
            color: textColor,
          }}
        >
          Delicious <br /> Saucy Chicken Wings
        </h2>

        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.4",
            marginBottom: "20px",
            color: textColor,
          }}
        >
          Deshi masala style • extra saucy • spicy flavour punch
        </p>

        <div
          className="discount-btn"
          style={{
            display: "inline-block",
            backgroundColor: buttonBg,
            padding: "12px 28px",
            borderRadius: "35px",
            fontWeight: "700",
            fontSize: "1rem",
            color: "#fff",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = buttonHover;
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = buttonBg;
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          40% DISCOUNT
        </div>
      </div>

      {/* Image */}
      <div
        style={{
          flex: "0 0 350px", 
          height: "350px",
          borderRadius: "50%",
          overflow: "hidden",
          border: `5px solid ${accentColor}`,
          boxShadow: darkMode ? "0 8px 30px rgba(0,0,0,0.4)" : "0 8px 20px rgba(0,0,0,0.15)",
        }}
      >
        <img
          src={special1}
          alt="Saucy Chicken Wings"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Responsive */}
      <style>{`
       @media (max-width: 1024px) {
  .special-offer {
    flex-direction: column;
    text-align: center;
    gap: 20px;
    padding: 30px 20px;
  }
  .special-offer > div:first-child {
    max-width: 100%;
    padding-right: 0;
  }
  .special-offer > div:last-child {
    width: 250px !important;
    height: 250px !important; 
    margin-top: 10px;
    border-radius: 50%;          
  }
}

@media (max-width: 480px) {
  .special-offer > div:last-child {
    width: 180px !important;
    height: 180px !important;  
    border-radius: 50%;          
  }
}

      `}</style>
    </section>
  );
}
