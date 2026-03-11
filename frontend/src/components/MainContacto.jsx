import { useState, useLayoutEffect } from "react"; // Cambiamos a useLayoutEffect
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaComment,
  FaPaperPlane,
} from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { MdSubject } from "react-icons/md";
import "../css/contacto.css";

const MainContacto = () => {
  // === SOLUCIÓN DEFINITIVA PARA EL SCROLL DE REACT ROUTER ===
  useLayoutEffect(() => {
    // Forzamos el scroll de la ventana
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Por si el scroll lo está manejando el body o el HTML directamente en tu CSS
    document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  // ==========================================================

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
    preferencia: "WhatsApp",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/consultas/crearConsulta",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Nos pondremos en contacto contigo pronto.",
          confirmButtonColor: "#c8102e",
          timer: 3000,
        });

        // Limpiar formulario
        setFormData({
          nombre: "",
          email: "",
          telefono: "",
          asunto: "",
          mensaje: "",
          preferencia: "WhatsApp",
        });
      } else {
        throw new Error("Error al enviar el mensaje");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al enviar tu mensaje. Inténtalo nuevamente.",
        confirmButtonColor: "#c8102e",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contacto-wrapper">
      <div className="contacto-container">
        {/* Columna izquierda - Información */}
        <div className="contacto-info">
          <h1 className="contacto-titulo">Contáctanos</h1>
          <p className="contacto-descripcion">
            ¿Tenés alguna pregunta o querés más información? Estamos aquí para
            ayudarte. Completá el formulario y nos pondremos en contacto con vos
            lo antes posible.
          </p>

          <div className="contacto-details">
            <div className="detail-item">
              <FaEnvelope className="detail-icon" />
              <div>
                <h3>Email</h3>
                <p>contacto@yumotors.com</p>
              </div>
            </div>

            <div className="detail-item">
              <BsWhatsapp className="detail-icon" />
              <div>
                <h3>WhatsApp</h3>
                <p>+54 9 11 1234-5678</p>
              </div>
            </div>
          </div>

          <div className="contacto-horarios">
            <h3>Horarios de atención</h3>
            <p>Lunes a Viernes: 9:00 - 18:00</p>
            <p>Sábados: 9:00 - 13:00</p>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="contacto-form-container">
          <form onSubmit={handleSubmit} className="contacto-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">
                  <FaUser className="label-icon" />
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  <FaEnvelope className="label-icon" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="telefono">
                  <FaPhone className="label-icon" />
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+54 9 11 1234-5678"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="preferencia">
                  <BsWhatsapp className="label-icon" />
                  Preferencia de contacto
                </label>
                <select
                  id="preferencia"
                  name="preferencia"
                  value={formData.preferencia}
                  onChange={handleChange}
                  required
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Mail">Mail</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="asunto">
                <MdSubject className="label-icon" />
                Asunto
              </label>
              <input
                type="text"
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                placeholder="¿En qué podemos ayudarte?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">
                <FaComment className="label-icon" />
                Mensaje
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                placeholder="Escribí tu mensaje aquí..."
                rows="5"
                required
              ></textarea>
            </div>

            <button type="submit" className="btn-enviar" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Enviando...
                </>
              ) : (
                <>
                  <FaPaperPlane className="btn-icon" />
                  Enviar Mensaje
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MainContacto;