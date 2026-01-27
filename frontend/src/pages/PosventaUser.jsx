import React, { useState } from 'react';
import IngresoPosventa from '../components/IngresoPosventa';
import Header from '../components/Header';
import FormularioRegistroPosventa from '../components/FormularioRegistroPosventa';
import BotonWhatsapp from '../components/BotonWhatsapp';
import '../css/posventaUser.css';

const PosventaUser = () => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [patenteRegistro, setPatenteRegistro] = useState('');

  const handleMostrarFormulario = (patente) => {
    setPatenteRegistro(patente);
    setMostrarFormulario(true);
  };

  const handleVolver = () => {
    setMostrarFormulario(false);
    setPatenteRegistro('');
  };

  return (
    <>
      <Header />
      {mostrarFormulario ? (
        <FormularioRegistroPosventa 
          patenteInicial={patenteRegistro} 
          onVolver={handleVolver} 
        />
      ) : (
        <IngresoPosventa onMostrarFormulario={handleMostrarFormulario} />
      )}
      <BotonWhatsapp />
    </>
  );
};

export default PosventaUser;