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
    const close = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const bgColor = darkMode ? "#4B3621" : "#FDF6F0";
  const textColor = darkMode ? "#FFFFFF" : "#3B2F2F";
  const logoTextColor = darkMode ? "#FDF6F0" : "#8B5E3C";

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: bgColor }}>
      {/* TOP BAR */}
      <div className="top-bar">
        {/* LOGO */}
        <Link to="/" className="logo">
          <span style={{ color: logoTextColor }}>F</span>
          <img src={logo} alt="logo" />
          <img src={logo} alt="logo" />
          <span style={{ color: logoTextColor }}>DIAN</span>
        </Link>

        {/* HAMBURGER */}
        <div className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </div>

        {/* DESKTOP NAV */}
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/allreviews">Explore</Link>

          {!user && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {user && (
            <div className="avatar-wrapper" ref={dropdownRef}>
              <img
                src={user.photoURL || defaultAvatar}
                alt="avatar"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="dropdown-menu">
                  <Link to="/add-review">Add Review</Link>
                  <Link to="/my-reviews">My Reviews</Link>
                  <Link to="/my-favorites">My Favorites</Link>
                  <div className="divider" />
                  <button onClick={logout} className="logout">Logout</button>
                </div>
              )}
            </div>
          )}

          <button className="icon-btn" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>

     
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          {/* USER HEADER */}
          {user && (
            <div className="drawer-user">
              <img src={user.photoURL || defaultAvatar} alt="avatar" />
              <div>
                <p className="name">{user.displayName || "User"}</p>
                <span className="email">{user.email}</span>
              </div>
            </div>
          )}

          <div className="drawer-section">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/allreviews" onClick={() => setMobileMenuOpen(false)}>Explore</Link>
          </div>

          <div className="drawer-section">
            <button onClick={toggleDarkMode}>
              {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
            </button>
          </div>

          {!user && (
            <div className="drawer-section">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          )}

          {user && (
            <div className="drawer-section">
              <Link to="/add-review">Add Review</Link>
              <Link to="/my-reviews">My Reviews</Link>
              <Link to="/my-favorites">My Favorites</Link>
            </div>
          )}

          {user && (
            <div className="drawer-section danger">
              <button onClick={logout}>Logout</button>
            </div>
          )}
        </div>
      )}

      {/* STYLES */}
      <style>{`
        * { transition: all 0.2s ease; }

        .top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 14px 32px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          font-family: 'Poppins', sans-serif;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 4px;
          text-decoration: none;
          font-family: 'Fredoka One', cursive;
          font-size: 42px;
        }

        .logo img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .nav-links a {
          text-decoration: none;
          color: ${textColor};
          font-weight: 600;
          padding: 8px 14px;
          border-radius: 6px;
        }

        .nav-links a:hover {
          background: rgba(139,94,60,0.15);
        }

        .hamburger {
          display: none;
          font-size: 28px;
          cursor: pointer;
          color: ${textColor};
        }

        .avatar-wrapper { position: relative; }

        .avatar-wrapper img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          cursor: pointer;
        }

        .dropdown-menu {
          position: absolute;
          right: 0;
          top: 55px;
          width: 200px;
          background: ${bgColor};
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .dropdown-menu a,
        .dropdown-menu button {
          padding: 12px 16px;
          text-align: left;
          font-size: 15px;
          background: none;
          border: none;
          cursor: pointer;
          color: ${textColor};
        }

        .divider {
          height: 1px;
          background: rgba(0,0,0,0.1);
        }

        .logout { color: #e63946; }

        .icon-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: ${textColor};
        }

        /* 🔥 MOBILE DRAWER */
        .mobile-drawer {
          background: ${bgColor};
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
          padding: 12px 0;
          display: flex;
          flex-direction: column;
        }

        .drawer-user {
          display: flex;
          gap: 12px;
          padding: 16px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }

        .drawer-user img {
          width: 52px;
          height: 52px;
          border-radius: 50%;
        }

        .drawer-user .name {
          font-weight: 600;
          color: ${textColor};
        }

        .drawer-user .email {
          font-size: 13px;
          opacity: 0.7;
        }

        .drawer-section {
          display: flex;
          flex-direction: column;
          padding: 8px 0;
        }

        .drawer-section a,
        .drawer-section button {
          padding: 14px 20px;
          text-align: left;
          background: none;
          border: none;
          font-size: 16px;
          font-weight: 500;
          color: ${textColor};
          cursor: pointer;
        }

        .drawer-section a:hover,
        .drawer-section button:hover {
          background: rgba(139,94,60,0.15);
        }

        .drawer-section.danger button {
          color: #e63946;
        }

        .drawer-section.danger button:hover {
          background: rgba(230,57,70,0.15);
        }

        @media (max-width: 768px) {
          .nav-links { display: none; }
          .hamburger { display: block; }
        }
      `}</style>
    </nav>
  );
}
