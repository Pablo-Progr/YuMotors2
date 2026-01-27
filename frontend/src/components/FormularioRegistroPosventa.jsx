import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { FaIdCard, FaBuilding, FaCar, FaCalendar, FaPhone } from 'react-icons/fa';
import '../css/posventaUser.css';

const FormularioRegistroPosventa = ({ patenteInicial, onVolver }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patente: patenteInicial || '',
    marca: '',
    modelo: '',
    anio: '',
    telefono: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const codigoGenerado = generateCodigo();
      
      // Crear el vehículo en la base de datos
      const response = await axios.post('http://localhost:3000/api/veh-posventa/crear', {
        ...formData,
        codigo: codigoGenerado,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Vehículo registrado!',
          html: `
            <p>Tu vehículo ha sido registrado exitosamente.</p>
            <p><strong>Tu código de acceso es:</strong></p>
            <h3 class="text-primary">${codigoGenerado}</h3>
            <p class="text-muted">Guarda este código para consultar tus registros en el futuro.</p>
          `,
          confirmButtonText: 'Entendido',
        }).then(() => {
          // Redirigir a la página de registros con el ID del vehículo creado
          if (response.data.id) {
            navigate(`/posventa/registros/${response.data.id}`);
          } else {
            onVolver();
          }
        });
      }
    } catch (error) {
      console.error('Error al registrar el vehículo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo registrar el vehículo. Inténtalo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para generar un código aleatorio de 6 caracteres
  const generateCodigo = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo = '';
    for (let i = 0; i < 6; i++) {
      codigo += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return codigo;
  };

  return (
    <div className="posventa-wrapper">
      <div className="posventa-container">
        <div className="posventa-form-container">
          <h2 className="posventa-titulo text-center">Registrar Vehículo</h2>
          <p className="posventa-descripcion text-center">
            Completa los datos de tu vehículo para registrarlo en el sistema
          </p>
          
          <Form onSubmit={handleSubmit} className="posventa-form">
            <div className="form-group">
              <label>
                <FaIdCard className="label-icon" />
                Patente
              </label>
              <input
                type="text"
                name="patente"
                value={formData.patente}
                onChange={handleChange}
                placeholder="Ej: ABC123"
                required
                readOnly
              />
            </div>

            <div className="form-group">
              <label>
                <FaBuilding className="label-icon" />
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

            <div className="form-group">
              <label>
                <FaCar className="label-icon" />
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

            <div className="form-group">
              <label>
                <FaCalendar className="label-icon" />
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

            <div className="form-group">
              <label>
                <FaPhone className="label-icon" />
                Teléfono
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

            <button className="btn-posventa" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Registrando...
                </>
              ) : (
                'Registrar Vehículo'
              )}
            </button>
            
            <button className="btn-posventa btn-posventa-secondary mt-3" type="button" onClick={onVolver} disabled={loading}>
              Volver
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormularioRegistroPosventa;