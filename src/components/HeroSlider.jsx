import React, { useState, useEffect } from "react";

const images = [
  { src: "src/assets/Banner-1.jpg", title: "Delicious Biryani", desc: "Experience the rich flavors of our local biryani." },
  { src: "src/assets/banner-2.jpg", title: "Spicy Fuchka", desc: "Taste the crunchy street favorite with a twist." },
  { src: "src/assets/banner-3.jpg", title: "Crispy Samosa", desc: "Perfect snack with a crispy golden shell." },
  { src: "src/assets/banner-4.jpg", title: "Ruti & Beef Curry", desc: "Traditional home-cooked comfort meal." },
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
            backgroundColor: "rgba(0,0,0,0.4)", // dark overlay for text readability
            backgroundBlendMode: "darken",
            pointerEvents: index === current ? "auto" : "none", // prevent interaction with hidden slides
          }}
        >
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "3rem", marginBottom: "15px" }}>
            {img.title}
          </h1>
          <p
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.25rem",
              maxWidth: "600px",
              marginBottom: "20px",
            }}
          >
            {img.desc}
          </p>
          <button
            style={{
              padding: "12px 25px",
              fontSize: "1.1rem",
              backgroundColor: "#ffb743ff",
              border: "none",
              borderRadius: "8px",
              color: "#2d6a4f",
              fontWeight: "bold",
              cursor: "pointer",
              width: "max-content",
            }}
          >
            Explore More
          </button>
        </div>
      ))}
    </section>
  );
}