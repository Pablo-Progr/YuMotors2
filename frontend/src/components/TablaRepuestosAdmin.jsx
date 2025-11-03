import axios from 'axios';
import { useEffect, useState } from 'react'; 
import Swal from 'sweetalert2';

const TablaRepuestosAdmin = () => {

  const [repuestos, setRepuestos] = useState([]);

  useEffect(() => {
    const fetchRepuestos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/repuestos/repuestos");
        setRepuestos(response.data);

        if (response) {
          Swal.fire({
            icon: "success",
            title: "Repuestos cargados",
          });
        }

      } catch (error) {
        console.error("Error fetching repuestos:", error);
      }
    }

    fetchRepuestos();
  }, []);

  const handleEliminarRepuesto = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/repuestos/eliminar/${id}`);
      setRepuestos(repuestos.filter((repuesto) => repuesto.idRepuesto !== id));
      Swal.fire({
        icon: "success",
        title: "Repuesto eliminado",
      });
    } catch (error) {
      console.error("Error deleting repuesto:", error);
    }
  };

return (
  <div className="table-responsive p-3 rounded">
    <table className="table table-dark table-hover align-middle">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nombre</th>
          <th>Marca</th>
          <th>Numero de Parte</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Descipcion</th>
          <th className="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {repuestos.map((repuestos) => (
          <tr key={repuestos.idRepuesto}>
            <td>{repuestos.idRepuesto}</td>
            <td>{repuestos.nombre}</td>
            <td>{repuestos.marca}</td>
            <td>{repuestos.numeroParte}</td>
            <td>${repuestos.precio}</td>
            <td>{repuestos.stock}</td>
            <td>{repuestos.descripcion}</td>
            <td className="text-end">
              <button className="btn btn-sm btn-outline-light me-2">
                <i className="bi bi-pencil"></i>
              </button>
              <button className="btn btn-sm btn-outline-danger" onClick={() => handleEliminarRepuesto(repuestos.idRepuesto)}>
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}

export default TablaRepuestosAdmin;
