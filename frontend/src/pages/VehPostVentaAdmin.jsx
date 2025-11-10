import React from 'react'
import Sidebar from '../components/Sidebar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/admin.css";
import TablaVehPostventaAdmin from '../components/TablaVehPostventaAdmin';

const VehPostVentaAdmin = () => {
  return (
    <div className="d-flex bg-dark text-white min-vh-100">
        <Sidebar/>
        <main className="flex-grow-1 p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1 className="fw-bold fs-2">Vehiculos registrados en posventa.</h1>
        </div>
          <TablaVehPostventaAdmin/>
      </main>
        
    </div>
  )
}

export default VehPostVentaAdmin