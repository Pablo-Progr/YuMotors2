import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NotFound = () => {
  const navigate = useNavigate();

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
        <div style={{ display: "flex", gap: "1rem", marginTop: "2rem" }}>
          <button
            className="btn btn-danger px-4"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left me-2"></i>Volver
          </button>
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
