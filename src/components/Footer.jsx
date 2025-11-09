import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si"; // X icon for Twitter replacement
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer
      style={{
        background: "linear-gradient(135deg, #6fcf97 0%, #ffffff 100%)",
        padding: "60px 50px",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "50px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
        boxShadow: "0 -4px 15px rgba(0,0,0,0.05)",
        fontFamily: "'Poppins', sans-serif",
        color: "#2d6a4f",
      }}
    >
      {/* Left section: Logo + About */}
      <div style={{ flex: "1 1 300px", marginBottom: "25px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "15px", marginBottom: "20px" }}>
          <img
            src={logo}
            alt="Foodian Logo"
            style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }}
          />
          <h3 style={{ fontSize: "36px", fontWeight: "700", margin: 0 }}>FOODIAN</h3>
        </div>
        <p style={{ fontSize: "18px", lineHeight: "1.8", maxWidth: "400px" }}>
          Delicious food, delivered fresh to your door. Explore our menu and enjoy a wholesome dining experience at home.
        </p>
      </div>

      {/* Middle section: Quick Links */}
      <div style={{ flex: "1 1 200px", marginBottom: "25px" }}>
        <h4
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "15px",
            position: "relative",
            display: "inline-block",
            paddingLeft: "15px",
          }}
        >
          Quick Links
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#2d6a4f",
              transform: "translateY(-50%)",
            }}
          ></span>
          <span
            style={{
              position: "absolute",
              left: "-30px",
              top: "50%",
              width: "20px",
              height: "2px",
              background: "#2d6a4f",
              borderRadius: "2px",
              transform: "translateY(-50%)",
            }}
          ></span>
        </h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {["Home", "About", "Menu", "Contact"].map((link) => (
            <li key={link} style={{ marginBottom: "12px" }}>
              <a
                href="#"
                style={{
                  textDecoration: "none",
                  color: "#2d6a4f",
                  fontSize: "18px",
                  fontWeight: "500",
                  transition: "color 0.2s, transform 0.2s",
                  display: "inline-block",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = "#1b4332";
                  e.currentTarget.style.transform = "translateX(5px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = "#2d6a4f";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right section: Social Media */}
      <div style={{ flex: "1 1 200px", marginBottom: "25px" }}>
        <h4
          style={{
            fontSize: "24px",
            fontWeight: "700",
            marginBottom: "15px",
            position: "relative",
            display: "inline-block",
            paddingLeft: "15px",
          }}
        >
          Follow Us
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#2d6a4f",
              transform: "translateY(-50%)",
            }}
          ></span>
          <span
            style={{
              position: "absolute",
              left: "-30px",
              top: "50%",
              width: "20px",
              height: "2px",
              background: "#2d6a4f",
              borderRadius: "2px",
              transform: "translateY(-50%)",
            }}
          ></span>
        </h4>
        <div style={{ display: "flex", gap: "25px", marginTop: "10px" }}>
          <a
            href="#"
            style={{
              color: "#2d6a4f",
              fontSize: "28px",
              transition: "color 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#1b4332";
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#2d6a4f";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            style={{
              color: "#2d6a4f",
              fontSize: "28px",
              transition: "color 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#1b4332";
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#2d6a4f";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <FaInstagram />
          </a>
          <a
            href="#"
            style={{
              color: "#2d6a4f",
              fontSize: "28px",
              transition: "color 0.2s, transform 0.2s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.color = "#1b4332";
              e.currentTarget.style.transform = "scale(1.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.color = "#2d6a4f";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <SiX />
          </a>
        </div>
      </div>
    </footer>
  );
}
