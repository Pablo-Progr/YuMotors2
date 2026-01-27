import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCalendar, FaClock, FaTools, FaFileAlt, FaTachometerAlt } from 'react-icons/fa';
import '../css/posventaUser.css';

const FormTurnos = ({ vehiculo, onCerrar }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    kilometraje: '',
    tipoPostVent: '',
    descripcion: '',
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
      // Crear el registro con estado 0 (Pendiente)
      const nuevoRegistro = {
        idVehiculoPostVenta: vehiculo.idVehiculoPostVenta,
        fecha: formData.fecha,
        hora: formData.hora,
        kilometraje: formData.kilometraje,
        tipoPostVent: formData.tipoPostVent,
        descripcion: formData.descripcion,
        estado: 0, // Siempre pendiente
      };

      const response = await axios.post(
        'http://localhost:3000/api/reg-posventa/crear',
        nuevoRegistro
      );

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Turno agendado!',
          html: `
            <p>Tu turno ha sido agendado exitosamente.</p>
            <p><strong>Fecha:</strong> ${formData.fecha}</p>
            <p><strong>Hora:</strong> ${formData.hora}</p>
            <p><strong>Servicio:</strong> ${formData.tipoPostVent}</p>
            <p class="text-muted mt-3">Recibirás una confirmación pronto.</p>
          `,
          confirmButtonText: 'Entendido',
        }).then(() => {
          onCerrar();
        });
      }
    } catch (error) {
      console.error('Error al agendar el turno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo agendar el turno. Inténtalo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="posventa-form-container">
      <h3 className="posventa-titulo text-center" style={{ fontSize: '2rem' }}>
        Agendar Turno
      </h3>
      <p className="posventa-descripcion text-center">
        <strong>Vehículo:</strong> {vehiculo.marca} {vehiculo.modelo} ({vehiculo.patente})
      </p>

      <Form onSubmit={handleSubmit} className="posventa-form">
        <div className="form-group">
          <label>
            <FaCalendar className="label-icon" />
            Fecha del servicio
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaClock className="label-icon" />
            Hora del servicio
          </label>
          <input
            type="time"
            name="hora"
            value={formData.hora}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaTachometerAlt className="label-icon" />
            Kilometraje actual
          </label>
          <input
            type="number"
            name="kilometraje"
            value={formData.kilometraje}
            onChange={handleChange}
            placeholder="Ej: 15000"
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaTools className="label-icon" />
            Tipo de servicio
          </label>
          <select
            name="tipoPostVent"
            value={formData.tipoPostVent}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un servicio</option>
            <option value="Mantenimiento Preventivo">Mantenimiento Preventivo</option>
            <option value="Cambio de Aceite">Cambio de Aceite</option>
            <option value="Revisión General">Revisión General</option>
            <option value="Reparación de Frenos">Reparación de Frenos</option>
            <option value="Alineación y Balanceo">Alineación y Balanceo</option>
            <option value="Cambio de Neumáticos">Cambio de Neumáticos</option>
            <option value="Diagnóstico Electrónico">Diagnóstico Electrónico</option>
            <option value="Reparación de Motor">Reparación de Motor</option>
            <option value="Servicio de Aire Acondicionado">Servicio de Aire Acondicionado</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <FaFileAlt className="label-icon" />
            Descripción adicional (opcional)
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe cualquier detalle adicional sobre el servicio que necesitas..."
            rows="4"
            style={{
              padding: '0.9rem 1rem',
              border: '2px solid #e0e0e0',
              borderRadius: '8px',
              fontSize: '1rem',
              fontFamily: 'inherit',
              width: '100%',
              resize: 'vertical',
            }}
          />
        </div>

        <button className="btn-posventa" type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="spinner"></div>
              Agendando...
            </>
          ) : (
            'Agendar Turno'
          )}
        </button>

        <button
          className="btn-posventa btn-posventa-secondary mt-3"
          type="button"
          onClick={onCerrar}
          disabled={loading}
        >
          Cancelar
        </button>
      </Form>
    </div>
  );
};

export default FormTurnos;