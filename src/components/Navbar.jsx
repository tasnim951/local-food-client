import { FaSearch } from "react-icons/fa";
import { Link } from "react-router"; // react-router only, per your teacher
import logo from "../assets/logo.png";

export default function Navbar() {
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
      }}
    >
      {/* Left side: FOODIAN logo + text */}
      <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
        <span style={{ fontSize: "48px", color: "#2d6a4f" }}>F</span>

        {/* First O replaced by logo */}
        <div style={{ width: "48px", height: "48px" }}>
          <img
            src={logo}
            alt="Foodian Logo"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Second O replaced by logo */}
        <div style={{ width: "48px", height: "48px" }}>
          <img
            src={logo}
            alt="Foodian Logo"
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <span style={{ fontSize: "48px", color: "#2d6a4f" }}>DIAN</span>
      </div>

      {/* Right side: Search + Login/Register */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          fontSize: "18px",
          fontWeight: 700,
          fontFamily: "'Poppins', sans-serif",
          color: "#2d6a4f",
        }}
      >
        <FaSearch style={{ cursor: "pointer", fontSize: "20px" }} />

        <Link
          to="/login"
          style={{
            textDecoration: "none",
            padding: "6px 14px",
            borderRadius: "8px",
            color: "#2d6a4f",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "rgba(47,128,79,0.15)")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            textDecoration: "none",
            padding: "6px 14px",
            borderRadius: "8px",
            color: "#2d6a4f",
            transition: "all 0.2s",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.background = "rgba(47,128,79,0.15)")
          }
          onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
        >
          Register
        </Link>
      </div>
    </nav>
  );
}
