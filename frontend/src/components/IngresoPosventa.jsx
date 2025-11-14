import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaCar, FaClipboardList, FaKey, FaCalendarAlt } from 'react-icons/fa';
import FormTurnos from './FormTurnos';
import logo from "../img/yumotors-rojo-blanco.png";
import '../css/posventaUser.css';

const IngresoPosventa = ({ onMostrarFormulario }) => {
  const navigate = useNavigate();
  const [mostrarModalRegistro, setMostrarModalRegistro] = useState(false);
  const [mostrarModalCodigo, setMostrarModalCodigo] = useState(false);
  const [mostrarModalConsulta, setMostrarModalConsulta] = useState(false);
  const [mostrarModalTurno, setMostrarModalTurno] = useState(false);
  const [mostrarFormTurnos, setMostrarFormTurnos] = useState(false);
  const [patente, setPatente] = useState('');
  const [codigo, setCodigo] = useState('');
  const [codigoConsulta, setCodigoConsulta] = useState('');
  const [codigoTurno, setCodigoTurno] = useState('');
  const [vehiculoEncontrado, setVehiculoEncontrado] = useState(null);
  const [vehiculoParaTurno, setVehiculoParaTurno] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingConsulta, setLoadingConsulta] = useState(false);
  const [loadingTurno, setLoadingTurno] = useState(false);

  const abrirModalRegistro = () => {
    setMostrarModalRegistro(true);
  };

  const cerrarModalRegistro = () => {
    setPatente('');
    setVehiculoEncontrado(null);
    setMostrarModalRegistro(false);
  };

  const abrirModalCodigo = () => {
    setMostrarModalCodigo(true);
  };

  const cerrarModalCodigo = () => {
    setCodigo('');
    setMostrarModalCodigo(false);
  };

  const handleSubmitRegistro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.get(
        `http://localhost:3000/api/signin-posventa/patente/${patente}`
      );

      if (response.data && response.data.idVehiculoPostVenta) {
        setVehiculoEncontrado(response.data);
        
        Swal.fire({
          icon: 'error',
          title: 'Vehículo ya registrado',
          text: 'Este vehículo ya está registrado en el sistema. Puedes consultar sus registros ingresando el código.',
          confirmButtonText: 'Entendido',
        });
      }
    } catch (error) {
      console.error('Error al buscar vehículo:', error);
      
      if (error.response && error.response.status === 404) {
        // Cerrar modal y mostrar formulario de registro
        cerrarModalRegistro();
        if (onMostrarFormulario) {
          onMostrarFormulario(patente);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al buscar el vehículo. Inténtalo de nuevo.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCodigo = async (e) => {
    e.preventDefault();
    
    if (vehiculoEncontrado && vehiculoEncontrado.codigo === codigo) {
      Swal.fire({
        icon: 'success',
        title: '¡Código correcto!',
        text: 'Accediendo a tus registros...',
        timer: 1500,
        showConfirmButton: false,
      });
      
      // Redirigir a la página de registros del usuario
      navigate(`/posventa/registros/${vehiculoEncontrado.idVehiculoPostVenta}`);
      cerrarModalCodigo();
      cerrarModalRegistro();
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Código incorrecto',
        text: 'El código ingresado no es válido. Por favor, verifica e intenta nuevamente.',
      });
    }
  };

  const handleConsultarRegistros = () => {
    setMostrarModalConsulta(true);
  };

  const cerrarModalConsulta = () => {
    setCodigoConsulta('');
    setMostrarModalConsulta(false);
  };

  const abrirModalTurno = () => {
    setMostrarModalTurno(true);
  };

  const cerrarModalTurno = () => {
    setCodigoTurno('');
    setVehiculoParaTurno(null);
    setMostrarFormTurnos(false);
    setMostrarModalTurno(false);
  };

  const handleSubmitConsulta = async (e) => {
    e.preventDefault();
    setLoadingConsulta(true);

    try {
      // Buscar todos los vehículos
      const response = await axios.get('http://localhost:3000/api/veh-posventa');
      
      // Buscar el vehículo que coincida con el código
      const vehiculoConCodigo = response.data.find(
        (v) => v.codigo === codigoConsulta
      );

      if (vehiculoConCodigo) {
        Swal.fire({
          icon: 'success',
          title: '¡Código válido!',
          text: 'Accediendo a tus registros...',
          timer: 1500,
          showConfirmButton: false,
        });
        
        // Redirigir a la página de registros del usuario
        navigate(`/posventa/registros/${vehiculoConCodigo.idVehiculoPostVenta}`);
        cerrarModalConsulta();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Código no encontrado',
          text: 'No se encontró ningún vehículo con ese código. Por favor, verifica e intenta nuevamente.',
        });
      }
    } catch (error) {
      console.error('Error al buscar vehículo por código:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al buscar el vehículo. Inténtalo de nuevo.',
      });
    } finally {
      setLoadingConsulta(false);
    }
  };

  const handleSubmitTurno = async (e) => {
    e.preventDefault();
    setLoadingTurno(true);

    try {
      // Buscar todos los vehículos
      const response = await axios.get('http://localhost:3000/api/veh-posventa');
      
      // Buscar el vehículo que coincida con el código
      const vehiculoConCodigo = response.data.find(
        (v) => v.codigo === codigoTurno
      );

      if (vehiculoConCodigo) {
        setVehiculoParaTurno(vehiculoConCodigo);
        setMostrarFormTurnos(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Código no encontrado',
          text: 'No se encontró ningún vehículo con ese código. Por favor, verifica e intenta nuevamente.',
        });
      }
    } catch (error) {
      console.error('Error al buscar vehículo por código:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error al buscar el vehículo. Inténtalo de nuevo.',
      });
    } finally {
      setLoadingTurno(false);
    }
  };

  return (
    <div className="posventa-wrapper">
      <div className="posventa-container">
        <div className="posventa-form-container">
          <img className='logo-yu' src={logo} alt="YuMotors Logo" />
          <h2 className="posventa-titulo text-center">Portal de Posventa</h2>
          <p className="posventa-descripcion text-center">
            Registre su vehículo y consulte el historial de servicios de mantenimiento realizados
          </p>
          
          <div className="d-flex flex-column gap-3">
            <button
              className="btn-posventa"
              onClick={abrirModalRegistro}
            >
              <FaCar className="btn-icon" />
              Registrar mi vehículo
            </button>
            <button
              className="btn-posventa btn-posventa-secondary"
              onClick={handleConsultarRegistros}
            >
              <FaClipboardList className="btn-icon" />
              Consultar mis registros
            </button>
            <button
              className="btn-posventa"
              onClick={abrirModalTurno}
            >
              <FaCalendarAlt className="btn-icon" />
              Agendar un turno
            </button>
          </div>
        </div>
      </div>

      {/* Modal para registrar vehículo */}
      <Modal show={mostrarModalRegistro} onHide={cerrarModalRegistro} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-flex align-items-center gap-2">
            <FaCar className="text-danger" />
            Registrar Vehículo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmitRegistro} className="posventa-form">
            <div className="form-group">
              <label>
                <FaCar className="label-icon" />
                Patente del Vehículo
              </label>
              <input
                type="text"
                name="patente"
                value={patente}
                onChange={(e) => setPatente(e.target.value.toUpperCase())}
                placeholder="Ej: ABC123"
                required
                autoFocus
              />
              <Form.Text className="text-muted">
                Ingresa la patente de tu vehículo
              </Form.Text>
            </div>
            <button className="btn-posventa" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Buscando...
                </>
              ) : (
                'Continuar'
              )}
            </button>
            {vehiculoEncontrado && (
              <button className="btn-posventa btn-posventa-secondary mt-2" type="button" onClick={abrirModalCodigo}>
                <FaKey className="btn-icon" />
                Consultar con código
              </button>
            )}
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para ingresar código */}
      <Modal show={mostrarModalCodigo} onHide={cerrarModalCodigo} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-flex align-items-center gap-2">
            <FaKey className="text-danger" />
            Ingresar Código de Acceso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmitCodigo} className="posventa-form">
            <div className="form-group">
              <label>
                <FaKey className="label-icon" />
                Código de Acceso
              </label>
              <input
                type="text"
                name="codigo"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                placeholder="Ingresa tu código"
                maxLength={6}
                required
                autoFocus
              />
              <Form.Text className="text-muted">
                Ingresa el código de acceso proporcionado al registrar tu vehículo
              </Form.Text>
            </div>
            <button className="btn-posventa" type="submit">
              Acceder
            </button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para consultar registros */}
      <Modal show={mostrarModalConsulta} onHide={cerrarModalConsulta} centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-flex align-items-center gap-2">
            <FaClipboardList className="text-danger" />
            Consultar Registros
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={handleSubmitConsulta} className="posventa-form">
            <div className="form-group">
              <label>
                <FaKey className="label-icon" />
                Código de Acceso
              </label>
              <input
                type="text"
                name="codigoConsulta"
                value={codigoConsulta}
                onChange={(e) => setCodigoConsulta(e.target.value)}
                placeholder="Ingresa tu código"
                maxLength={6}
                required
                autoFocus
              />
              <Form.Text className="text-muted">
                Ingresa el código de acceso proporcionado al registrar tu vehículo
              </Form.Text>
            </div>
            <button className="btn-posventa" type="submit" disabled={loadingConsulta}>
              {loadingConsulta ? (
                <>
                  <div className="spinner"></div>
                  Buscando...
                </>
              ) : (
                'Consultar'
              )}
            </button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal para agendar turno */}
      <Modal show={mostrarModalTurno} onHide={cerrarModalTurno} centered size="lg">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="d-flex align-items-center gap-2">
            <FaCalendarAlt className="text-danger" />
            Agendar Turno
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {!mostrarFormTurnos ? (
            <Form onSubmit={handleSubmitTurno} className="posventa-form">
              <div className="form-group">
                <label>
                  <FaKey className="label-icon" />
                  Código de Acceso
                </label>
                <input
                  type="text"
                  name="codigoTurno"
                  value={codigoTurno}
                  onChange={(e) => setCodigoTurno(e.target.value)}
                  placeholder="Ingresa tu código"
                  maxLength={6}
                  required
                  autoFocus
                />
                <Form.Text className="text-muted">
                  Ingresa el código de acceso de tu vehículo registrado
                </Form.Text>
              </div>
              <button className="btn-posventa" type="submit" disabled={loadingTurno}>
                {loadingTurno ? (
                  <>
                    <div className="spinner"></div>
                    Verificando...
                  </>
                ) : (
                  'Continuar'
                )}
              </button>
            </Form>
          ) : (
            <FormTurnos vehiculo={vehiculoParaTurno} onCerrar={cerrarModalTurno} />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IngresoPosventa;