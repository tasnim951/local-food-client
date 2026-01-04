import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function Modal({ modalData, closeModal }) {
  const { darkMode } = useContext(ThemeContext);

  if (!modalData) return null;

  /* ===== COFFEE THEME COLORS ===== */
  const colors = darkMode
    ? {
        overlay: "rgba(0,0,0,0.6)",
        bg: "#2a1a12",       
        text: "#f5ede6",     
        heading: "#FFFFFF",  
        subText: "#d7c2b2",
        accent: "#8b5e3c",
        accentShadow: "0 0 5px #6f4e37",
        closeBtnBg: "#8b5e3c",
        closeBtnColor: "#fff",
      }
    : {
        overlay: "rgba(45, 106, 79, 0.35)",
        bg: "#ffffff",        // light card background
        text: "#3B2F2F",
        heading: "#3B2F2F",
        subText: "#6B4A3A",
        accent: "#8b5e3c",
        accentShadow: "0 0 5px #6f4e37",
        closeBtnBg: "#8b5e3c",
        closeBtnColor: "#fff",
      };

  return (
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: colors.overlay,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: colors.bg,
          borderRadius: "15px",
          padding: "20px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: `0 8px 20px rgba(0,0,0,0.3)`,
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: colors.text,
          position: "relative",
          textAlign: "center",
          userSelect: "none",
          transition: "background 0.3s, color 0.3s",
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: colors.closeBtnBg,
            color: colors.closeBtnColor,
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            fontWeight: "700",
            fontSize: "18px",
            cursor: "pointer",
            lineHeight: "28px",
            textAlign: "center",
          }}
          aria-label="Close modal"
        >
          x
        </button>

        <img
          src={modalData.photo}
          alt={modalData.foodName}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "12px",
            boxShadow: `0 3px 10px ${colors.accentShadow}`,
          }}
        />

        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "700",
            fontSize: "1.6rem",
            marginBottom: "12px",
            color: colors.heading,
            position: "relative",
            paddingLeft: "40px",
            display: "inline-block",
          }}
        >
          {modalData.foodName}
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: colors.accent,
              transform: "translateY(-50%)",
              boxShadow: colors.accentShadow,
            }}
          ></span>
          <span
            style={{
              position: "absolute",
              left: "-15px",
              top: "50%",
              width: "25px",
              height: "2.5px",
              background: colors.accent,
              borderRadius: "2px",
              transform: "translateY(-50%)",
              boxShadow: colors.accentShadow,
            }}
          ></span>
        </h2>

        {/* DESCRIPTION */}
        <div
          style={{
            marginBottom: "15px",
            lineHeight: "1.4",
            fontSize: "0.95rem",
            padding: "0 5px",
          }}
        >
          <h3
            style={{
              fontWeight: "700",
              marginBottom: "8px",
              color: colors.accent,
              borderBottom: `1.5px solid ${colors.accent}`,
              display: "inline-block",
              paddingBottom: "3px",
            }}
          >
            Description
          </h3>
          <p>{modalData.description}</p>
        </div>

        {/* CONTACT INFO */}
        <div style={{ padding: "0 5px" }}>
          <h3
            style={{
              fontWeight: "700",
              marginBottom: "8px",
              color: colors.accent,
              borderBottom: `1.5px solid ${colors.accent}`,
              display: "inline-block",
              paddingBottom: "3px",
            }}
          >
            Contact Info
          </h3>
          <p style={{ margin: "6px 0" }}>
            Contact:{" "}
            <a
              href={`tel:${modalData.contact.phone}`}
              style={{ color: colors.subText, textDecoration: "none" }}
            >
              {modalData.contact.phone}
            </a>
          </p>
          <p style={{ margin: "6px 0" }}>
            E-mail:{" "}
            <a
              href={`mailto:${modalData.contact.email}`}
              style={{ color: colors.subText, textDecoration: "none" }}
            >
              {modalData.contact.email}
            </a>
          </p>
        </div>

        <style>
          {`
            @media (max-width: 500px) {
              div[style*="maxWidth: 450px"] {
                max-width: 95%;
                padding: 15px;
              }
              h2 {
                font-size: 1.3rem;
                padding-left: 30px;
              }
              img {
                max-height: 150px;
              }
              h3 {
                font-size: 1rem;
              }
              p {
                font-size: 0.9rem;
              }
              button[aria-label="Close modal"] {
                width: 24px;
                height: 24px;
                font-size: 16px;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
