import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import axios from "axios";
import Swal from "sweetalert2";
import { FaIdCard, FaBuilding, FaCar, FaCalendar, FaPhone, FaArrowLeft } from "react-icons/fa";
import "../css/miPosventa.css";

const RegistrarVehiculo = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patente: "",
    marca: "",
    modelo: "",
    anio: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para generar código aleatorio de 6 caracteres
  const generateCodigo = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let codigo = "";
    for (let i = 0; i < 6; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Verificar si el vehículo ya existe
      const checkResponse = await axios.get("http://localhost:3000/api/veh-posventa");
      const vehiculoExistente = checkResponse.data.find(
        (v) => v.patente.toLowerCase() === formData.patente.toLowerCase()
      );

      if (vehiculoExistente) {
        Swal.fire({
          icon: "warning",
          title: "Vehículo ya registrado",
          text: "Ya existe un vehículo con esta patente en el sistema.",
          confirmButtonText: "Entendido",
        });
        setLoading(false);
        return;
      }

      const codigoGenerado = generateCodigo();

      console.log('=== DEBUG FRONTEND ===');
      console.log('Usuario actual:', user);
      console.log('idUsuario:', user?.idUsuario);
      console.log('Datos a enviar:', {
        ...formData,
        codigo: codigoGenerado,
        idUsuario: user.idUsuario,
      });

      // Crear el vehículo asociado al usuario
      const response = await axios.post("http://localhost:3000/api/veh-posventa/crear", {
        ...formData,
        codigo: codigoGenerado,
        idUsuario: user.idUsuario,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "¡Vehículo registrado!",
          html: `
            <p>Tu vehículo ha sido registrado exitosamente.</p>
            <p style="margin-top: 16px;"><strong>${formData.marca} ${formData.modelo}</strong></p>
            <p>Patente: <strong>${formData.patente}</strong></p>
          `,
          confirmButtonText: "Ver mis vehículos",
        }).then(() => {
          navigate("/mi-posventa");
        });
      }
    } catch (error) {
      console.error("Error al registrar el vehículo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo registrar el vehículo. Inténtalo de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVolver = () => {
    navigate("/mi-posventa");
  };

  return (
    <section className="registro-section">
      <div className="registro-container">
        <button className="registro-back-btn" onClick={handleVolver}>
          <FaArrowLeft />
          Volver a Mis Vehículos
        </button>

        <div className="registro-form-container">
          <h2 className="registro-titulo">Registrar Vehículo</h2>
          <p className="registro-descripcion">
            Completa los datos de tu vehículo para registrarlo en el servicio de posventa
          </p>

          <form onSubmit={handleSubmit} className="registro-form">
            <div className="registro-form-group">
              <label>
                <FaIdCard className="registro-label-icon" />
                Patente
              </label>
              <input
                type="text"
                name="patente"
                value={formData.patente}
                onChange={handleChange}
                placeholder="Ej: ABC123 o AB123CD"
                required
                maxLength={10}
                style={{ textTransform: "uppercase" }}
              />
            </div>

            <div className="registro-form-group">
              <label>
                <FaBuilding className="registro-label-icon" />
                Marca
              </label>
              <input
                type="text"
                name="marca"
                value={formData.marca}
                onChange={handleChange}
                placeholder="Ej: Toyota"
                required
              />
            </div>

            <div className="registro-form-group">
              <label>
                <FaCar className="registro-label-icon" />
                Modelo
              </label>
              <input
                type="text"
                name="modelo"
                value={formData.modelo}
                onChange={handleChange}
                placeholder="Ej: Corolla"
                required
              />
            </div>

            <div className="registro-form-group">
              <label>
                <FaCalendar className="registro-label-icon" />
                Año
              </label>
              <input
                type="number"
                name="anio"
                value={formData.anio}
                onChange={handleChange}
                placeholder="Ej: 2023"
                min="1900"
                max={new Date().getFullYear() + 1}
                required
              />
            </div>

            <div className="registro-form-group">
              <label>
                <FaPhone className="registro-label-icon" />
                Teléfono de contacto
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ej: +54 9 11 1234-5678"
                required
              />
            </div>

            <button type="submit" className="registro-btn-submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="registro-spinner"></div>
                  Registrando...
                </>
              ) : (
                <>
                  <FaCar />
                  Registrar Vehículo
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RegistrarVehiculo;
