import React, { useState, useEffect } from "react";
import banner1 from "../assets/banner-1.jpg";
import banner2 from "../assets/banner-2.jpg";
import banner3 from "../assets/banner-3.jpg";
import banner4 from "../assets/banner-4.jpg";

const images = [
  { src: banner1, title: "Delicious Biryani", desc: "Experience the rich flavors of our local biryani." },
  { src: banner2, title: "Spicy Fuchka", desc: "Taste the crunchy street favorite with a twist." },
  { src: banner3, title: "Crispy Samosa", desc: "Perfect snack with a crispy golden shell." },
  { src: banner4, title: "Ruti & Beef Curry", desc: "Traditional home-cooked comfort meal." },
];

       export default function HeroSlider() {
          const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="hero-slider"
      style={{
        position: "relative",
        width: "100%",
        height: "400px",
        overflow: "hidden",
        borderRadius: "10px",
      }}
    >
      {images.map((img, index) => (
        <div
          key={index}
          style={{
            backgroundImage: `url(${img.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            opacity: index === current ? 1 : 0,
            transition: "opacity 1s ease-in-out",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "50px",
            backgroundColor: "rgba(0,0,0,0.4)",
            backgroundBlendMode: "darken",
            pointerEvents: index === current ? "auto" : "none",
          }}
        >
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "3rem",
              marginBottom: "5px",
            }}
          >
            {img.title}
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.25rem",
              maxWidth: "600px",
              marginBottom: "15px",
            }}
          >
            {img.desc}
          </p>
        </div>
      ))}

     
      <style>
        {`
          @media (max-width: 768px) {
            .hero-slider h1,
            .hero-slider p {
              display: none;
            }
          }
        `}
      </style>
    </section>
  );
}
