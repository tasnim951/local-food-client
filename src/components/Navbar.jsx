import { Link } from "react-router";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import { ThemeContext } from "../contexts/ThemeProvider";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/profile.png";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ===== THEME COLORS ===== */
  const bgColor = darkMode ? "#4B3621" : "#FDF6F0";
  const textColor = darkMode ? "#FFFFFF" : "#3B2F2F";
  const logoTextColor = darkMode ? "#FDF6F0" : "#8B5E3C";
  const hoverBg = darkMode
    ? "rgba(255,255,255,0.08)"
    : "rgba(139,94,60,0.15)";

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 32px",
        backgroundColor: bgColor,
        color: textColor,
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* LOGO */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontFamily: "'Fredoka One', cursive",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: "42px", color: logoTextColor }}>F</span>
          <img src={logo} alt="O1" style={logoStyle} />
          <img src={logo} alt="O2" style={logoStyle} />
          <span style={{ fontSize: "42px", color: logoTextColor }}>DIAN</span>
        </div>
      </Link>

      {/* HAMBURGER */}
      <div
        className="hamburger"
        onClick={() => setMobileMenuOpen((p) => !p)}
        style={{
          fontSize: "28px",
          cursor: "pointer",
          display: "none",
          color: textColor,
        }}
      >
        ☰
      </div>

      {/* NAV LINKS */}
      <div className="nav-links" style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link to="/" style={navLink(textColor)}>Home</Link>
        <Link to="/allreviews" style={navLink(textColor)}>Explore</Link>

        {!user && (
          <>
            <Link to="/login" style={navLink(textColor)}>Login</Link>
            <Link to="/register" style={navLink(textColor)}>Register</Link>
          </>
        )}

        {user && (
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <img
              src={user.photoURL || defaultAvatar}
              alt="profile"
              onClick={() => setDropdownOpen((p) => !p)}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                cursor: "pointer",
              }}
            />

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 10px)",
                  background: bgColor,
                  borderRadius: "10px",
                  width: "180px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                }}
              >
                <Link to="/add-review" style={dropdownLink(textColor)}>Add Review</Link>
                <Link to="/my-reviews" style={dropdownLink(textColor)}>My Reviews</Link>
                <Link to="/my-favorites" style={dropdownLink(textColor)}>My Favorites</Link>
                <button
                  onClick={logout}
                  style={{
                    ...dropdownLink(textColor),
                    border: "none",
                    background: "none",
                    color: "#e63946",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* THEME TOGGLE */}
        <button
          onClick={toggleDarkMode}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "20px",
            color: textColor,
          }}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: ${bgColor};
            flex-direction: column;
            align-items: flex-start;
            padding: 20px;
            display: ${mobileMenuOpen ? "flex" : "none"};
          }
        }
      `}</style>
    </nav>
  );
}

/* ===== STYLES ===== */
const logoStyle = {
  width: "42px",
  height: "42px",
  borderRadius: "50%",
  objectFit: "cover",
};

const navLink = (color) => ({
  textDecoration: "none",
  color,
  fontWeight: 600,
  padding: "6px 14px",
  borderRadius: "6px",
});

const dropdownLink = (color) => ({
  display: "block",
  padding: "10px 16px",
  textDecoration: "none",
  color,
  cursor: "pointer",
});
