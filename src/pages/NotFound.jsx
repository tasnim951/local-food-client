import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function NotFound() {
  const { darkTheme } = useContext(ThemeContext);

  const colors = {
    bg: darkTheme ? "#2E1E1E" : "#FFF7F0", 
    text: darkTheme ? "#FDF6F0" : "#3B2F2F",
    accent: "#8B5E3C",
    buttonBg: "#8B5E3C",
    buttonHover: "#A67C52",
    buttonText: "#fff",
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: colors.bg,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: "8rem",
          fontWeight: "900",
          color: colors.accent,
          marginBottom: "20px",
        }}
      >
        404
      </div>

      <div
        style={{
          fontSize: "2rem",
          fontWeight: "700",
          color: colors.text,
          marginBottom: "20px",
        }}
      >
        Oops! Page Not Found
      </div>

      <div
        style={{
          fontSize: "1.2rem",
          color: colors.text,
          marginBottom: "40px",
        }}
      >
        The page you are looking for might have been removed or never existed.
      </div>

      <a
        href="/"
        style={{
          backgroundColor: colors.buttonBg,
          color: colors.buttonText,
          padding: "14px 32px",
          borderRadius: "50px",
          fontWeight: "700",
          fontSize: "1.1rem",
          textDecoration: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          transition: "0.3s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = colors.buttonHover)}
        onMouseLeave={(e) => (e.currentTarget.style.background = colors.buttonBg)}
      >
        Back to Home
      </a>
    </div>
  );
}
