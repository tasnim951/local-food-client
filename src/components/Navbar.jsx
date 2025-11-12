import { FaSearch } from "react-icons/fa";
import { Link } from "react-router";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../assets/logo.png";      
import defaultAvatar from "../assets/profile.png"; 

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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
        fontFamily: "'Fredoka One', cursive",
        position: "relative",
        zIndex: 10,
      }}
    >
      
      <div
        style={{ display: "flex", alignItems: "center", gap: "0", userSelect: "none" }}
      >
        <span style={{ fontSize: "48px", color: "#2d6a4f" }}>F</span>

        <div style={{ width: "48px", height: "48px" }}>
          <img
            src={logo}
            alt="Foodian Logo O1"
            style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
          />
        </div>

        <div style={{ width: "48px", height: "48px" }}>
          <img
            src={logo}
            alt="Foodian Logo O2"
            style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
          />
        </div>

        <span style={{ fontSize: "48px", color: "#2d6a4f" }}>DIAN</span>
      </div>

     
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "18px",
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          color: "#2d6a4f",
          position: "relative",
        }}
      >
        <FaSearch style={{ cursor: "pointer", fontSize: "20px" }} />

        {!user && (
          <>
            <Link
              to="/login"
              style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(47,128,79,0.15)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={linkStyle}
              onMouseOver={(e) => (e.currentTarget.style.background = "rgba(47,128,79,0.15)")}
              onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
            >
              Register
            </Link>
          </>
        )}

        {user && (
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <img
              src={
                user.photoURL && user.photoURL.trim() !== "" ? user.photoURL : defaultAvatar
              }
              alt="User Avatar"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = defaultAvatar;
              }}
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #2d6a4f",
                cursor: "pointer",
              }}
              onClick={() => setDropdownOpen((prev) => !prev)}
              title={user.displayName || "User"}
            />

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  right: 0,
                  top: "calc(100% + 8px)",
                  background: "white",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  width: "180px",
                  fontSize: "16px",
                  color: "#2d6a4f",
                  zIndex: 20,
                }}
              >
                <Link to="/add-review" style={dropdownLinkStyle} onClick={() => setDropdownOpen(false)}>
                  Add Review
                </Link>
                <Link to="/my-reviews" style={dropdownLinkStyle} onClick={() => setDropdownOpen(false)}>
                  My Reviews
                </Link>
                <Link to="/my-favorites" style={dropdownLinkStyle} onClick={() => setDropdownOpen(false)}>
                  My Favorites
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  style={{
                    ...dropdownLinkStyle,
                    background: "none",
                    border: "none",
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    padding: "10px 20px",
                    fontWeight: "700",
                    color: "#e63946",
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  padding: "6px 14px",
  borderRadius: "8px",
  color: "#2d6a4f",
  transition: "all 0.2s",
  userSelect: "none",
};

const dropdownLinkStyle = {
  display: "block",
  padding: "10px 20px",
  textDecoration: "none",
  color: "#2d6a4f",
  fontWeight: "600",
  borderBottom: "1px solid #d9d9d9",
  cursor: "pointer",
  userSelect: "none",
};
