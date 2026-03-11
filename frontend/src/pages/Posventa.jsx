import React from "react";
import MainPosventa from "../components/MainPosventa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Posventa = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <MainPosventa />
      <Footer />
    </div>
  );
};

export default Posventa;
