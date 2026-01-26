import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import BotonWhatsapp from '../components/BotonWhatsapp';
import 'bootstrap/dist/css/bootstrap.min.css';

const VehiculoDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vehiculo, setVehiculo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVehiculo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/veh-posventa`);
        const vehiculoEncontrado = response.data.find(
          (v) => v.idVehiculoPostVenta === parseInt(id)
        );
        setVehiculo(vehiculoEncontrado);
      } catch (error) {
        console.error('Error al obtener el vehículo:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehiculo();
  }, [id]);

  if (loading) {
    return (
      <>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
      </Container>
      <BotonWhatsapp />
      </>
    );
  }

  if (!vehiculo) {
    return (
      <>
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Card className="shadow-lg bg-dark text-white text-center p-5">
          <Card.Body>
            <h2>Vehículo no encontrado</h2>
            <Button variant="primary" onClick={() => navigate('/posventa')} className="mt-3">
              Volver
            </Button>
          </Card.Body>
        </Card>
      </Container>
      <BotonWhatsapp />
      </>
    );
  }

  return (
    <>
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100">
        <Col md={8} lg={6} className="mx-auto">
          <Card className="shadow-lg bg-dark text-white">
            <Card.Body className="p-5">
              <Card.Title className="text-center mb-4 fs-2 fw-bold">
                Información del Vehículo
              </Card.Title>
              <div className="mb-4">
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">ID:</Col>
                  <Col>{vehiculo.idVehiculoPostVenta}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Patente:</Col>
                  <Col>{vehiculo.patente}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Marca:</Col>
                  <Col>{vehiculo.marca}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Modelo:</Col>
                  <Col>{vehiculo.modelo}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Año:</Col>
                  <Col>{vehiculo.anio}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Teléfono:</Col>
                  <Col>{vehiculo.telefono}</Col>
                </Row>
                <Row className="mb-3">
                  <Col xs={4} className="fw-bold">Código:</Col>
                  <Col>{vehiculo.codigo}</Col>
                </Row>
              </div>
              <div className="d-grid gap-2">
                <Button variant="primary" size="lg">
                  Ver Historial de Servicios
                </Button>
                <Button variant="outline-light" onClick={() => navigate('/posventa')}>
                  Volver
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    <BotonWhatsapp />
    </>
  );
};

export default VehiculoDetalle;
