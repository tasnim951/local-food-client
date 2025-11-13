export default function NotFound() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        background: "linear-gradient(135deg,#ffffff 0%,#e9f1ec 100%)",
        overflow: "hidden",
      }}
    >
     
         <img
        src="/src/assets/error.avif"
        alt="404"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: "0.92",
        }}
      />

     
      <div
        style={{
          position: "absolute",
          bottom: "50px", 
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#0c0c0c",
            fontWeight: "700",
            fontSize: "40px",
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
            marginBottom: "16px", 
          }}
        >
          Page Not Found !
        </div>

        <a
          href="/"
        
          style={{
            background: "#2d6a4f",
            padding: "14px 32px",
            borderRadius: "10px",
            color: "#fff",
            fontWeight: "600",
            fontSize: "18px",
            textDecoration: "none",
            boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
            transition: ".2s",
            display: "inline-block",
          }}
          onMouseEnter={(e) => 
            (e.target.style.background = "#1b4332")}
         
          onMouseLeave={(e) => 
            (e.target.style.background = "#2d6a4f")}
        >
          Back To Home
        </a>
      </div>
    </div>
  );
}
