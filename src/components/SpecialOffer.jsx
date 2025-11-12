import special1 from "../assets/special-1.jpg";

export default function SpecialOffer() {
  return (
    <section
      style={{
        background: "linear-gradient(90deg, #c1e1c1 0%, #e8f5e9 100%)",
        padding: "60px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        maxWidth: "1200px",
        margin: "0 auto",
        boxSizing: "border-box",
        position: "relative",
        color: "#2d6a4f",
      }}
    >
      
      <div style={{ flex: 1, paddingRight: "40px" }}>
       
        <p
          style={{
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: "14px",
            letterSpacing: "3px",
            marginBottom: "15px",
            position: "relative",
            display: "inline-block",
            paddingLeft: "25px",
          }}
        >
          TODAY'S SPECIAL OFFER
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
              left: "-35px",
              top: "50%",
              width: "30px",
              height: "2px",
              background: "#2d6a4f",
              borderRadius: "2px",
              transform: "translateY(-50%)",
            }}
          ></span>
        </p>

       
        <h2
          style={{
            fontSize: "3.8rem",
            fontWeight: "900",
            margin: "0 0 20px",
            fontFamily: "'Poppins', sans-serif",
            lineHeight: 1.1,
            color: "#14532d",
          }}
        >
          Delicious <br /> Saucy Chicken Wings
        </h2>

        {/* Description */}
        <p
          style={{
            fontSize: "1.4rem",
            lineHeight: "1.5",
            marginBottom: "25px",
          }}
        >
          Deshi masala style • extra saucy • spicy flavour punch
        </p>

        
        <div
          style={{
            display: "inline-block",
            backgroundColor: "#27613cff",
            padding: "16px 40px",
            borderRadius: "35px",
            fontWeight: "800",
            fontSize: "1.3rem",
            color: "#fff",
            boxShadow: "0 6px 15px rgba(34, 197, 94, 0.6)",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4a775aff"; 
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(178, 212, 189, 0.6)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#203f2bff";
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 6px 15px rgba(57, 66, 60, 0.6)";
          }}
        >
          40% DISCOUNT
        </div>
      </div>

      
      <div
        style={{
          flex: "0 0 340px",
          height: "340px",
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow: "0 10px 50px rgba(0,0,0,0.1)",
          userSelect: "none",
          pointerEvents: "none",
          border: "5px solid #2d6a4f",
         
        }}
      >
        <img
          src={special1}
          alt="Saucy Chicken Wings"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
           
          }}
        />
      </div>
    </section>
  );
}
