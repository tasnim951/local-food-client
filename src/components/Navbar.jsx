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
        flexWrap: "wrap", 
      }}
    >
     
     <div style={{ display: "flex", alignItems: "center", gap: "0", userSelect: "none", height:"50px" }}>
  <span style={{ fontSize: "48px", color: "#2d6a4f", lineHeight: "48px" }}>F</span>

  <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center" }}>
    <img
      src={logo}
      alt="Foodian Logo O1"
      style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
    />
  </div>

  <div style={{ width: "48px", height: "48px", display: "flex", alignItems: "center" }}>
    <img
      src={logo}
      alt="Foodian Logo O2"
      style={{ width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover" }}
    />
  </div>

  <span style={{ fontSize: "48px", color: "#2d6a4f", lineHeight: "48px" }}>DIAN</span>
</div>

      
      <div
        style={{
          display: "none",
          cursor: "pointer",
          fontSize: "28px",
          color: "#2d6a4f",
          userSelect: "none",
        }}
        onClick={() => setMobileMenuOpen((prev) => !prev)}
        className="hamburger-menu"
      >
        &#9776;
      </div>

      {/* Nav Links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "20px",
          fontWeight: 700,
          fontFamily: " sans-serif",
          color: "#2d6a4f",
          position: "relative",
          height:"20px",
         marginTop: "-20px",

      
          flexBasis: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
        className="nav-links"
      >
       
        <Link
          to="/"
          style={linkStyle}
          onMouseOver={(e) => (e.currentTarget.style.background = "rgba(47,128,79,0.15)")}
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Home
        </Link>

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
                width: "48px",
                height: "48px",
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

      
          <style>
       
        {`
          @media (max-width: 768px) {
            nav {
              padding: 15px 20px;
            }
            .hamburger-menu {
              display: block !important;
            }
            .nav-links {
              display: ${mobileMenuOpen ? "flex" : "none"} !important;
              flex-direction: column !important;
              gap: 12px !important;
              margin-top: 10px;
              width: 100%;
             
              justify-content: flex-start !important;
            }
           
           
               .nav-links a, .nav-links button {
              width: 100%;
              padding: 10px 0;
              border-radius: 6px;
              text-align: left;
              font-size: 20px;
              background-color: rgba(111, 207, 151, 0.15);
            }
          }
        `}
      </style>
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  padding: "0 12px",
  borderRadius: "8px",
  color: "#2d6a4f",
  transition: "all 0.2s",
  userSelect: "none",
  display: "flex",
  fontSize:"18px",
  alignItems:"center",
 
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
