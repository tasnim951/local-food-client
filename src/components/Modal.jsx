import React from "react";

export default function Modal({ modalData, closeModal }) {
  if (!modalData) return null;

  return (
    <div
      onClick={closeModal}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(45, 106, 79, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        padding: "10px",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(135deg, #e6f0e9 0%, #ffffff 100%)",
          borderRadius: "15px",
          padding: "20px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 8px 20px rgba(45, 106, 79, 0.35)",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          color: "#2d6a4f",
          position: "relative",
          textAlign: "center",
          userSelect: "none",
        }}
      >
        <button
          onClick={closeModal}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#2d6a4f",
            color: "white",
            border: "none",
            borderRadius: "50%",
            width: "28px",
            height: "28px",
            fontWeight: "700",
            fontSize: "18px",
            cursor: "pointer",
            lineHeight: "28px",
            textAlign: "center",
          }}
          aria-label="Close modal"
        >
               x
        </button>

        <img
          src={modalData.photo}
          alt={modalData.foodName}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "12px",
            boxShadow: "0 3px 10px rgba(45, 106, 79, 0.3)",
          }}
        />

        <h2
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: "700",
            fontSize: "1.6rem",
            marginBottom: "12px",
            position: "relative",
            paddingLeft: "40px",
            display: "inline-block",
          }}
        >
          {modalData.foodName}
          <span
            style={{
              position: "absolute",
              left: "10px",
              top: "50%",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#2d6a4f",
              transform: "translateY(-50%)",
              boxShadow: "0 0 5px #95d5b2",
            }}
          ></span>
          <span
            style={{
              position: "absolute",
              left: "-15px",
              top: "50%",
              width: "25px",
              height: "2.5px",
              background: "#2d6a4f",
              borderRadius: "2px",
              transform: "translateY(-50%)",
              boxShadow: "0 0 7px #95d5b2",
            }}
          ></span>
        </h2>

        <div
          style={{
            marginBottom: "15px",
            lineHeight: "1.4",
            fontSize: "0.95rem",
            padding: "0 5px",
          }}
        >
         
         
          <h3
            style={{
              fontWeight: "700",
              marginBottom: "8px",
              color: "#2d6a4f",
              borderBottom: "1.5px solid #2d6a4f",
              display: "inline-block",
              paddingBottom: "3px",
            }}
          >
            Description
          </h3>
          <p>{modalData.description}</p>
        </div>

        <div style={{ padding: "0 5px" }}>
          <h3
            style={{
              fontWeight: "700",
              marginBottom: "8px",
              color: "#2d6a4f",
              borderBottom: "1.5px solid #2d6a4f",
              display: "inline-block",
              paddingBottom: "3px",
            }}
          >
            Contact Info
          </h3>
          <p style={{ margin: "6px 0" }}>
            Contact:{" "}
            <a
              href={`tel:${modalData.contact.phone}`}
              style={{ color: "#1b4332", textDecoration: "none" }}
            >
              {modalData.contact.phone}
            </a>
          </p>
          <p style={{ margin: "6px 0" }}>
            E-mail:{" "}
            <a
              href={`mailto:${modalData.contact.email}`}
              style={{ color: "#1b4332", textDecoration: "none" }}
            >
              {modalData.contact.email}
            </a>
          </p>
        </div>

       
          <style>
          {`
            @media (max-width: 500px) {
              div[style*="maxWidth: 450px"] {
                max-width: 95%;
                padding: 15px;
              }
              h2 {
                font-size: 1.3rem;
                padding-left: 30px;
              }
              img {
                max-height: 150px;
              }
              h3 {
                font-size: 1rem;
              }
              p {
                font-size: 0.9rem;
              }
              button[aria-label="Close modal"] {
                width: 24px;
                height: 24px;
                font-size: 16px;
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
