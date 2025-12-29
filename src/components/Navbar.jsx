import { Link } from "react-router";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../assets/logo.png";
import defaultAvatar from "../assets/profile.png";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "linear-gradient(90deg, #6fcf97, #ffffff)",
        borderRadius: "10px",
        boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* LOGO (CLICKABLE HOME) */}
      <Link to="/" style={{ textDecoration: "none" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "50px",
            userSelect: "none",
            cursor: "pointer",
            fontFamily: "'Fredoka One', cursive",
          }}
        >
          <span style={{ fontSize: "46px", color: "#2d6a4f" }}>F</span>

          <img
            src={logo}
            alt="Foodian Logo 1"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <img
            src={logo}
            alt="Foodian Logo 2"
            style={{
              width: "46px",
              height: "46px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />

          <span style={{ fontSize: "46px", color: "#2d6a4f" }}>DIAN</span>
        </div>
      </Link>

      {/* HAMBURGER ICON */}
      <div
        className="hamburger-menu"
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        style={{
          cursor: "pointer",
          fontSize: "30px",
          color: "#2d6a4f",
          display: "none",
        }}
      >
        ☰
      </div>

      {/* NAV LINKS */}
      <div
        className="nav-links"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "22px",
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
        }}
      >
        <Link to="/" style={linkStyle}>Home</Link>

        {!user && (
          <>
            <Link to="/login" style={linkStyle}>Login</Link>
            <Link to="/register" style={linkStyle}>Register</Link>
          </>
        )}

        {user && (
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <img
              src={user.photoURL?.trim() ? user.photoURL : defaultAvatar}
              alt="User Avatar"
              onClick={() => setDropdownOpen((p) => !p)}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #2d6a4f",
                cursor: "pointer",
              }}
            />

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  width: "180px",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <Link to="/add-review" style={dropdownLinkStyle}>Add Review</Link>
                <Link to="/my-reviews" style={dropdownLinkStyle}>My Reviews</Link>
                <Link to="/my-favorites" style={dropdownLinkStyle}>My Favorites</Link>
                <button
                  onClick={logout}
                  style={{
                    ...dropdownLinkStyle,
                    border: "none",
                    background: "none",
                    color: "#e63946",
                    width: "100%",
                    textAlign: "left",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MOBILE STYLES */}
      <style>{`
        @media (max-width: 768px) {
          .hamburger-menu {
            display: block;
          }
          .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            align-items: flex-start;
            padding: 15px 20px;
            gap: 12px;
            display: ${mobileMenuOpen ? "flex" : "none"};
            box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            border-radius: 0 0 10px 10px;
          }
          .nav-links a {
            width: 100%;
            padding: 10px;
            border-radius: 6px;
            background: rgba(111, 207, 151, 0.15);
          }
        }
      `}</style>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#2d6a4f",
  padding: "6px 14px",
  borderRadius: "6px",
  fontSize: "17px",
  fontWeight: "600",
};

const dropdownLinkStyle = {
  display: "block",
  padding: "10px 20px",
  textDecoration: "none",
  color: "#2d6a4f",
  borderBottom: "1px solid #ddd",
  cursor: "pointer",
};
