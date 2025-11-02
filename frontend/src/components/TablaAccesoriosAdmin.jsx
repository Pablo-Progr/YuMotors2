import axios from "axios";
import { useEffect, useState } from "react";

const TablaAccesoriosAdmin = () => {
  
  const [accesorios, setAccesorios] = useState([]);

  useEffect(() => { 
    const fetchAccessories = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/accesorios/accesorios");
        setAccesorios(response.data);
      } catch (error) {
        console.error("Error fetching accessories:", error);
      }
    };

    fetchAccessories();
  }, []);

  return (
    <div className="table-responsive p-3 rounded">
      <table className="table table-dark table-hover align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Marca</th>
            <th>Descripcion</th>
            <th>Precio</th>
            <th>Stock</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {accesorios.map((accesorios) => (
            <tr key={accesorios.idAccesorio}>
              <td>{accesorios.idAccesorio}</td>
              <td>{accesorios.nombre}</td>
              <td>{accesorios.marca}</td>
              <td>{accesorios.descripcion}</td>
              <td>{accesorios.precio}</td>
              <td>{accesorios.stock}</td>
              <td className="text-end">
                <button className="btn btn-sm btn-outline-light me-2">
                  <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-sm btn-outline-danger">
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaAccesoriosAdmin;
