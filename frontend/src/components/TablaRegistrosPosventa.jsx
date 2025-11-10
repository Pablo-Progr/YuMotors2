import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/admin.css";
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';

const TablaRegistrosPosventa = (props) => {
    // allow id passed as prop or via route params
    const params = useParams();
    const id = props.id || params.id;

    const [regPosventa, setRegPosventa] = useState([]);
    const [registroSeleccionado, setRegistroSeleccionado] = useState(null);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [descripcionSeleccionada, setDescripcionSeleccionada] = useState(null);
    const [mostrarDescripcionModal, setMostrarDescripcionModal] = useState(false);
    const [mostrarCrearModal, setMostrarCrearModal] = useState(false);
    const [nuevoRegistro, setNuevoRegistro] = useState({
      fecha: '',
      hora: '',
      kilometraje: '',
      tipoPostVent: '',
      descripcion: '',
      estado: '0',
    });
    
    // Helper: format a date value into DD/MM/YYYY
    const formatDate = (value) => {
      if (!value) return '';
      // Try Date parse first (handles ISO and timestamps)
      const d = new Date(value);
      if (!isNaN(d)) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      }
      // Fallback for strings like YYYY-MM-DD
      if (typeof value === 'string') {
        const parts = value.split(/[-/]/);
        if (parts.length >= 3) {
          const [a, b, c] = parts;
          // assume YYYY-MM-DD
          if (a.length === 4) return `${String(c).padStart(2, '0')}/${String(b).padStart(2, '0')}/${a}`;
        }
      }
      return value;
    };

    // Helper: format a time value into HH:MM
    const formatTime = (value) => {
      if (!value) return '';
      // If it's an ISO-like datetime
      if (typeof value === 'string' && value.includes('T')) {
        const d = new Date(value);
        if (!isNaN(d)) return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      }
      // If it's already a time string like HH:MM[:SS]
      if (typeof value === 'string') {
        const m = value.match(/(\d{1,2}):(\d{2})/);
        if (m) return `${String(m[1]).padStart(2, '0')}:${m[2]}`;
      }
      // If it's a Date object
      if (value instanceof Date && !isNaN(value)) {
        return `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
      }
      return value;
    };

    // Helper: render estado numeric -> label with color
    const renderEstado = (estado) => {
      // Normalize to number when possible
      const n = Number(estado);
      if (n === 0) return <span className="badge bg-danger">Pendiente</span>;
      if (n === 1) return <span className="badge bg-warning text-dark">En proceso</span>;
      if (n === 2) return <span className="badge bg-success">Completado</span>;
      // fallback: if it's already a string label
      return <span>{estado}</span>;
    };

    useEffect(() => {
        const fetchRegistrosPosventa = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/reg-posventa/${id}`
            );
            setRegPosventa(response.data);
          } catch (error) {
            console.error("Error al obtener registros postventa:", error);
          }
        };

      fetchRegistrosPosventa();
      }, [id]);

  const abrirModal = (registro) => {
    // Convertir la fecha al formato YYYY-MM-DD
    const formattedRegistro = {
      ...registro,
      fecha: registro.fecha ? new Date(registro.fecha).toISOString().split('T')[0] : '',
    };
    setRegistroSeleccionado(formattedRegistro);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setRegistroSeleccionado(null);
    setMostrarModal(false);
  };

  const handleUpdateRegistro = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.put(
        `http://localhost:3000/api/reg-posventa/editar/${registroSeleccionado.idRegistroPostVenta}`,
        registroSeleccionado
      );

      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Registro actualizado correctamente.',
          timer: 1500,
          showConfirmButton: false,
        });
        // Recargar los registros
        const fetchRegistrosPosventa = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/reg-posventa/${id}`
            );
            setRegPosventa(response.data);
          } catch (error) {
            console.error('Error al obtener registros postventa:', error);
          }
        };
        fetchRegistrosPosventa();
        cerrarModal();
      }
    } catch (error) {
      console.error('Error al actualizar el registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el registro. Inténtalo de nuevo.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistroSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const abrirDescripcionModal = (descripcion) => {
    setDescripcionSeleccionada(descripcion);
    setMostrarDescripcionModal(true);
  };

  const cerrarDescripcionModal = () => {
    setDescripcionSeleccionada(null);
    setMostrarDescripcionModal(false);
  };

  const abrirCrearModal = () => {
    setMostrarCrearModal(true);
  };

  const cerrarCrearModal = () => {
    setNuevoRegistro({
      fecha: '',
      hora: '',
      kilometraje: '',
      tipoPostVent: '',
      descripcion: '',
      estado: '0',
    });
    setMostrarCrearModal(false);
  };

  const handleCrearRegistro = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/reg-posventa/crear', {
        idVehiculoPostVenta: props.id,
        ...nuevoRegistro,
      });

      if (response.status === 201) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Registro creado correctamente.',
          timer: 1500,
          showConfirmButton: false,
        });
        cerrarCrearModal();
        const fetchRegistrosPosventa = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/reg-posventa/${props.id}`
            );
            setRegPosventa(response.data);
          } catch (error) {
            console.error('Error al obtener registros postventa:', error);
          }
        };
        fetchRegistrosPosventa();
      }
    } catch (error) {
      console.error('Error al crear el registro:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo crear el registro. Inténtalo de nuevo.',
      });
    }
  };

  const handleChangeNuevoRegistro = (e) => {
    const { name, value } = e.target;
    setNuevoRegistro((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <Button variant="primary" onClick={abrirCrearModal}>
          <i className="bi bi-plus-circle"></i> Añadir Registro
        </Button>
      </div>

      <div className="table-responsive p-3 rounded">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>N°</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Kilometraje</th>
              <th>Tipo</th>
              <th>Descripción</th>
              <th>Estado</th>
              <th className="text-end">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {regPosventa.map((reg, idx) => (
              <tr key={reg.idRegistroPostVenta || idx}>
                <td>{idx + 1}</td>
                <td>{formatDate(reg.fecha)}</td>
                <td>{formatTime(reg.hora)}</td>
                <td>{reg.kilometraje}</td>
                <td>{reg.tipoPostVent}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-light"
                    onClick={() => abrirDescripcionModal(reg.descripcion)}
                  >
                    <i className="bi bi-eye"></i>
                  </button>
                </td>
                <td>{renderEstado(reg.estado)}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-light me-2"
                    onClick={() => abrirModal(reg)}
                  >
                    <i className="bi bi-pencil"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal para mostrar la descripción */}
      {mostrarDescripcionModal && (
        <Modal show={mostrarDescripcionModal} onHide={cerrarDescripcionModal} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Descripción</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <p>{descripcionSeleccionada}</p>
          </Modal.Body>
          <Modal.Footer className="bg-dark">
            <Button variant="secondary" onClick={cerrarDescripcionModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Modal de edición */}
      {mostrarModal && registroSeleccionado && (
        <Modal show={mostrarModal} onHide={cerrarModal} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Editar Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form onSubmit={handleUpdateRegistro}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={registroSeleccionado.fecha}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  name="hora"
                  value={registroSeleccionado.hora}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kilometraje</Form.Label>
                <Form.Control
                  type="number"
                  name="kilometraje"
                  value={registroSeleccionado.kilometraje}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  name="tipoPostVent"
                  value={registroSeleccionado.tipoPostVent}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={registroSeleccionado.descripcion}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={registroSeleccionado.estado}
                  onChange={handleChange}
                  required
                >
                  <option value="0">Pendiente</option>
                  <option value="1">En proceso</option>
                  <option value="2">Completado</option>
                </Form.Select>
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? 'Guardando...' : 'Guardar Cambios'}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal para crear un nuevo registro */}
      {mostrarCrearModal && (
        <Modal show={mostrarCrearModal} onHide={cerrarCrearModal} centered>
          <Modal.Header closeButton className="bg-dark text-white">
            <Modal.Title>Crear Nuevo Registro</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <Form onSubmit={handleCrearRegistro}>
              <Form.Group className="mb-3">
                <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  name="fecha"
                  value={nuevoRegistro.fecha}
                  onChange={handleChangeNuevoRegistro}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Hora</Form.Label>
                <Form.Control
                  type="time"
                  name="hora"
                  value={nuevoRegistro.hora}
                  onChange={handleChangeNuevoRegistro}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Kilometraje</Form.Label>
                <Form.Control
                  type="number"
                  name="kilometraje"
                  value={nuevoRegistro.kilometraje}
                  onChange={handleChangeNuevoRegistro}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Tipo</Form.Label>
                <Form.Control
                  type="text"
                  name="tipoPostVent"
                  value={nuevoRegistro.tipoPostVent}
                  onChange={handleChangeNuevoRegistro}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="descripcion"
                  value={nuevoRegistro.descripcion}
                  onChange={handleChangeNuevoRegistro}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  name="estado"
                  value={nuevoRegistro.estado}
                  onChange={handleChangeNuevoRegistro}
                  required
                >
                  <option value="0">Pendiente</option>
                  <option value="1">En proceso</option>
                  <option value="2">Completado</option>
                </Form.Select>
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Crear Registro
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  )
}

export default TablaRegistrosPosventa;