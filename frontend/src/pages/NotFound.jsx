import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/");
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "70vh",
          background: "#111",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1
          style={{
            fontSize: "8rem",
            fontWeight: "900",
            color: "#c0392b",
            lineHeight: 1,
            margin: 0,
          }}
        >
          404
        </h1>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "600", marginTop: "1rem" }}>
          Página no encontrada
        </h2>
        <p style={{ color: "#aaa", maxWidth: "420px", marginTop: "0.75rem", fontSize: "1rem" }}>
          La página que estás buscando no existe o no tenés permiso para acceder a ella.
        </p>

        {/* Timer Visualizer */}
        <div style={{ marginTop: "2rem", position: "relative", width: "120px", height: "120px" }}>
          <svg width="120" height="120" style={{ transform: "rotate(-90deg)" }}>
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#333"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#c0392b"
              strokeWidth="8"
              strokeDasharray={`${2 * Math.PI * 52}`}
              strokeDashoffset={`${2 * Math.PI * 52 * (1 - countdown / 10)}`}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "2rem",
              fontWeight: "700",
              color: "#c0392b",
            }}
          >
            {countdown}
          </div>
        </div>

        <p style={{ color: "#999", marginTop: "1rem", fontSize: "0.95rem" }}>
          Redirigiendo al inicio en {countdown} segundo{countdown !== 1 ? "s" : ""}...
        </p>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
          <button
            className="btn btn-outline-light px-4"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-house me-2"></i>Ir al inicio
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFound;
