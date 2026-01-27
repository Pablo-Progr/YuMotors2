import React from 'react'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/admin.css";
import TablaRegistrosPosventa from '../components/TablaRegistrosPosventa';
const RegistroPosventa = () => {
  // El parámetro de la ruta está definido como ":id" en `App.jsx`
  const { id } = useParams()

  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        <h1 className="fw-bold fs-2">Registro de Posventa - {id}</h1>
        <TablaRegistrosPosventa id={id} />
      </main>
    </div>
  )
}

export default RegistroPosventa