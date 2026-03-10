import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCalendar, FaClock, FaTools, FaFileAlt, FaTachometerAlt, FaCar, FaCheckCircle } from 'react-icons/fa';
import '../css/posventaUser.css';

// Horarios disponibles de 08:00 a 18:00 (intervalos de 1 hora)
const HORARIOS_DISPONIBLES = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

const FormTurnos = ({ vehiculo, onCerrar }) => {
  const [loading, setLoading] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState([]);
  const [cargandoHorarios, setCargandoHorarios] = useState(false);
  const [formData, setFormData] = useState({
    fecha: '',
    hora: '',
    kilometraje: '',
    tipoPostVent: '',
    descripcion: '',
  });

  // Función para verificar si una fecha es fin de semana
  const esFinDeSemana = (fechaStr) => {
    const fecha = new Date(fechaStr + 'T00:00:00');
    const dia = fecha.getDay();
    return dia === 0 || dia === 6; // 0 = Domingo, 6 = Sábado
  };

  // Función para obtener la próxima fecha laboral
  const getProximaFechaLaboral = () => {
    const hoy = new Date();
    let fecha = new Date(hoy);
    
    // Si es después de las 18:00, empezar desde mañana
    if (hoy.getHours() >= 18) {
      fecha.setDate(fecha.getDate() + 1);
    }
    
    // Avanzar hasta encontrar un día laboral
    while (fecha.getDay() === 0 || fecha.getDay() === 6) {
      fecha.setDate(fecha.getDate() + 1);
    }
    
    return fecha.toISOString().split('T')[0];
  };

  // Cargar horarios ocupados cuando cambia la fecha
  useEffect(() => {
    const cargarHorariosOcupados = async () => {
      if (!formData.fecha) {
        setHorariosOcupados([]);
        return;
      }

      setCargandoHorarios(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/reg-posventa/horarios-ocupados/${formData.fecha}`
        );
        setHorariosOcupados(response.data.horariosOcupados || []);
      } catch (error) {
        console.error('Error al cargar horarios ocupados:', error);
        setHorariosOcupados([]);
      } finally {
        setCargandoHorarios(false);
      }
    };

    cargarHorariosOcupados();
  }, [formData.fecha]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validación especial para la fecha
    if (name === 'fecha' && value) {
      if (esFinDeSemana(value)) {
        Swal.fire({
          icon: 'warning',
          title: 'Fecha no disponible',
          text: 'Los turnos solo están disponibles de Lunes a Viernes.',
          confirmButtonText: 'Entendido',
        });
        return;
      }
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      // Resetear hora si cambia la fecha
      ...(name === 'fecha' ? { hora: '' } : {}),
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
      
      // Manejar error de turno ocupado específicamente
      if (error.response?.status === 409) {
        Swal.fire({
          icon: 'error',
          title: 'Turno no disponible',
          text: error.response.data.error || 'El turno seleccionado ya fue tomado por otro usuario. Por favor, elija otro horario.',
        });
        // Recargar horarios ocupados
        setFormData(prev => ({ ...prev, hora: '' }));
        try {
          const resp = await axios.get(
            `http://localhost:3000/api/reg-posventa/horarios-ocupados/${formData.fecha}`
          );
          setHorariosOcupados(resp.data.horariosOcupados || []);
        } catch (e) {
          console.error('Error recargando horarios:', e);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agendar el turno. Inténtalo de nuevo.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Obtener horarios disponibles (filtrar los ocupados)
  const horariosLibres = HORARIOS_DISPONIBLES.filter(
    h => !horariosOcupados.includes(h)
  );

  const handleHorarioClick = (horario) => {
    if (horariosOcupados.includes(horario)) return;
    setFormData(prev => ({ ...prev, hora: horario }));
  };

  return (
    <div className="posventa-form-container">
      <div className="turnos-header">
        <h3 className="posventa-titulo">
          <FaCalendar className="label-icon" />
          Agendar Turno
        </h3>
        <div className="vehiculo-info-badge">
          <FaCar />
          <span>{vehiculo.marca} {vehiculo.modelo} - {vehiculo.patente}</span>
        </div>
      </div>

      <Form onSubmit={handleSubmit} className="posventa-form">
        <div className="form-group">
          <label>
            <FaCalendar className="label-icon" />
            Fecha del servicio
            <span className="label-hint">Lunes a Viernes</span>
          </label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            min={getProximaFechaLaboral()}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaClock className="label-icon" />
            Hora del servicio
            <span className="label-hint">08:00 - 18:00</span>
          </label>
          
          {!formData.fecha ? (
            <div className="horarios-placeholder">
              Seleccione primero una fecha
            </div>
          ) : cargandoHorarios ? (
            <div className="horarios-placeholder horarios-loading">
              Cargando horarios disponibles...
            </div>
          ) : (
            <>
              <div className="horarios-grid">
                {HORARIOS_DISPONIBLES.map((horario) => {
                  const ocupado = horariosOcupados.includes(horario);
                  const seleccionado = formData.hora === horario;
                  return (
                    <button
                      key={horario}
                      type="button"
                      onClick={() => handleHorarioClick(horario)}
                      disabled={ocupado}
                      className={`horario-btn ${ocupado ? 'ocupado' : ''} ${seleccionado ? 'seleccionado' : ''}`}
                    >
                      {horario}
                    </button>
                  );
                })}
              </div>
              <div className="disponibilidad-info">
                <span className="disponibles">
                  <FaCheckCircle /> {horariosLibres.length} disponibles
                </span>
                <span className="ocupados">
                  {horariosOcupados.length} ocupados
                </span>
              </div>
            </>
          )}
          <input type="hidden" name="hora" value={formData.hora} required />
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
            <option value="Mantenimiento Preventivo">🔧 Mantenimiento Preventivo</option>
            <option value="Cambio de Aceite">🛢️ Cambio de Aceite</option>
            <option value="Revisión General">🔍 Revisión General</option>
            <option value="Reparación de Frenos">🛑 Reparación de Frenos</option>
            <option value="Alineación y Balanceo">⚖️ Alineación y Balanceo</option>
            <option value="Cambio de Neumáticos">🔘 Cambio de Neumáticos</option>
            <option value="Diagnóstico Electrónico">💻 Diagnóstico Electrónico</option>
            <option value="Reparación de Motor">⚙️ Reparación de Motor</option>
            <option value="Servicio de Aire Acondicionado">❄️ Servicio de Aire Acondicionado</option>
            <option value="Otros">📝 Otros</option>
          </select>
        </div>

        <div className="form-group">
          <label>
            <FaFileAlt className="label-icon" />
            Descripción adicional
            <span className="label-hint">Opcional</span>
          </label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Describe cualquier detalle adicional sobre el servicio que necesitas..."
            rows="3"
          />
        </div>

        <button 
          type="submit" 
          disabled={loading || !formData.hora}
          className="btn-posventa"
        >
          {loading ? (
            <>
              <div className="spinner"></div>
              Agendando turno...
            </>
          ) : (
            <>
              <FaCheckCircle />
              Confirmar Turno
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onCerrar}
          disabled={loading}
          className="btn-posventa btn-posventa-secondary"
        >
          Cancelar
        </button>
      </Form>
    </div>
  );
};

export default FormTurnos;