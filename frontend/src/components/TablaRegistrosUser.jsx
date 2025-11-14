import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/admin.css";
import { Modal, Button } from 'react-bootstrap';

const TablaRegistrosUser = (props) => {
    const params = useParams();
    const id = props.id || params.id;

    const [regPosventa, setRegPosventa] = useState([]);
    const [descripcionSeleccionada, setDescripcionSeleccionada] = useState(null);
    const [mostrarDescripcionModal, setMostrarDescripcionModal] = useState(false);
    
    // Helper: format a date value into DD/MM/YYYY
    const formatDate = (value) => {
      if (!value) return '';
      const d = new Date(value);
      if (!isNaN(d)) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}/${month}/${year}`;
      }
      if (typeof value === 'string') {
        const parts = value.split(/[-/]/);
        if (parts.length >= 3) {
          const [a, b, c] = parts;
          if (a.length === 4) return `${String(c).padStart(2, '0')}/${String(b).padStart(2, '0')}/${a}`;
        }
      }
      return value;
    };

    // Helper: format a time value into HH:MM
    const formatTime = (value) => {
      if (!value) return '';
      if (typeof value === 'string' && value.includes('T')) {
        const d = new Date(value);
        if (!isNaN(d)) return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      }
      if (typeof value === 'string') {
        const m = value.match(/(\d{1,2}):(\d{2})/);
        if (m) return `${String(m[1]).padStart(2, '0')}:${m[2]}`;
      }
      if (value instanceof Date && !isNaN(value)) {
        return `${String(value.getHours()).padStart(2, '0')}:${String(value.getMinutes()).padStart(2, '0')}`;
      }
      return value;
    };

    // Helper: render estado numeric -> label with color
    const renderEstado = (estado) => {
      const n = Number(estado);
      if (n === 0) return <span className="badge bg-danger">Pendiente</span>;
      if (n === 1) return <span className="badge bg-warning text-dark">En proceso</span>;
      if (n === 2) return <span className="badge bg-success">Completado</span>;
      return <span>{estado}</span>;
    };

    useEffect(() => {
        const fetchRegistrosPosventa = async () => {
          try {
            const response = await axios.get(
              `http://localhost:3000/api/reg-posventa-user/${id}`
            );
            setRegPosventa(response.data);
          } catch (error) {
            console.error("Error al obtener registros postventa:", error);
          }
        };

      fetchRegistrosPosventa();
      }, [id]);

  const abrirDescripcionModal = (descripcion) => {
    setDescripcionSeleccionada(descripcion);
    setMostrarDescripcionModal(true);
  };

  const cerrarDescripcionModal = () => {
    setDescripcionSeleccionada(null);
    setMostrarDescripcionModal(false);
  };

  return (
    <>
      <div className="table-responsive p-3 rounded">
        {regPosventa.length === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-inbox" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
            <h4 className="text-white mt-3">No hay registros disponibles</h4>
            <p className="text-muted">Todavía no hay registros de post-venta para mostrar.</p>
          </div>
        ) : (
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
              </tr>
            </thead>
            <tbody>
              {regPosventa.map((reg, idx) => (
                <tr key={reg.idRegistroPostVenta || idx}>
                  <td>{idx + 1}</td>
                  <td>{formatDate(reg.fecha)}</td>
                  <td>{formatTime(reg.hora)}</td>
                  <td>{reg.kilometraje}km</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
    </>
  )
}

export default TablaRegistrosUser;