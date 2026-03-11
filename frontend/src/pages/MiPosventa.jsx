import React from 'react';
import Header from '../components/Header';
import MainMiPosventa from '../components/MainMiPosventa';
import Footer from '../components/Footer';
import BotonWhatsapp from '../components/BotonWhatsapp';

const MiPosventa = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <MainMiPosventa />
      <Footer />
      <BotonWhatsapp />
    </div>
  );
};

export default MiPosventa;
