import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si"; 
import logo from "../assets/logo.png";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";

export default function Footer() {
  const { darkMode } = useContext(ThemeContext);

  const bgColor = darkMode ? "#3B2F2F" : "#FDF6F0"; 
  const textColor = darkMode ? "#FFFFFF" : "#3B2F2F";
  const accentColor = darkMode ? "#8B5E3C" : "#6F4E37";

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor, fontFamily: "'Poppins', sans-serif'" }}>
      <div className="footer-container">
       
        <div className="footer-section footer-left">
          <div className="footer-logo">
            <img src={logo} alt="Foodian Logo" />
            <h2>FOODIAN</h2>
          </div>
          <p>
            Fresh and delicious food delivered to your door. Enjoy a seamless dining experience at home.
          </p>
        </div>

       
        <div className="footer-section footer-center">
          <h3>Quick Links</h3>
          <ul>
            {["Home", "About", "Menu", "Contact"].map((link) => (
              <li key={link}>
                <a href="#">{link}</a>
              </li>
            ))}
          </ul>
        </div>

       
        <div className="footer-section footer-right">
          <h3>Follow Us</h3>
          <div className="social-icons">
            {[<FaFacebookF />, <FaInstagram />, <SiX />].map((Icon, i) => (
              <a key={i} href="#">{Icon}</a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} Foodian. All rights reserved.
      </div>

      <style>{`
        .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: flex-start; /* align left, we use gap to separate sections */
          flex-wrap: wrap;
          gap: 100px; /* big horizontal gap between left, center, right on large screens */
          padding: 50px 30px 30px;
        }

        .footer-section {
          flex: 1 1 auto;
          min-width: 220px;
        }

        /* Left Section */
        .footer-left p {
          font-size: 16px;
          line-height: 1.8;
          max-width: 400px;
          margin-top: 12px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .footer-logo img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
        }

        .footer-logo h2 {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }

        /* Center Section */
        .footer-center h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .footer-center ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-center ul li {
          margin-bottom: 12px;
        }

        .footer-center ul li a {
          text-decoration: none;
          color: ${textColor};
          font-size: 16px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .footer-center ul li a:hover {
          color: ${accentColor};
        }

        /* Right Section */
        .footer-right h3 {
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .social-icons {
          display: flex;
          gap: 20px;
        }

        .social-icons a {
          color: ${textColor};
          font-size: 22px;
          transition: color 0.2s, transform 0.2s;
        }

        .social-icons a:hover {
          color: ${accentColor};
          transform: scale(1.3);
        }

        /* Bottom */
        .footer-bottom {
          text-align: center;
          margin-top: 30px;
          font-size: 15px;
          color: ${textColor};
          border-top: 1px solid ${darkMode ? "#5a443a" : "#e0dcd4"};
          padding-top: 12px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-container {
            gap: 50px; /* still maintain decent gap */
          }

          .footer-left p {
            max-width: 350px;
          }
        }

        @media (max-width: 768px) {
          .footer-container {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 30px;
          }

          .social-icons {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .footer-container {
            padding: 35px 15px 15px;
          }

          .footer-section p,
          .footer-center ul li a {
            font-size: 14px;
          }

          .footer-left p {
            max-width: 100%;
          }

          .footer-section h3 {
            font-size: 16px;
          }

          .social-icons a {
            font-size: 26px;
          }
        }
      `}</style>
    </footer>
  );
}
