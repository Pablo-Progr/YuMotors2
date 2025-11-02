const repuestos = [
  {
    id: 18,
    name: 'Llantas de Aleación 18"',
    marca: "LLT",
    numeroParte: "LLT-001",
    price: "$850.00",
    stock: 25,
    descripcion: "Juego de llantas de aleación de 18 pulgadas",
  },
  {
    id: 18,
    name: 'Llantas de Aleación 18"',
    marca: "LLT",
    numeroParte: "LLT-001",
    price: "$850.00",
    stock: 25,
    descripcion: "Juego de llantas de aleación de 18 pulgadas",
  },
  {
    id: 18,
    name: 'Llantas de Aleación 18"',
    marca: "LLT",
    numeroParte: "LLT-001",
    price: "$850.00",
    stock: 25,
    descripcion: "Juego de llantas de aleación de 18 pulgadas",
  },
  {
    id: 18,
    name: 'Llantas de Aleación 18"',
    marca: "LLT",
    numeroParte: "LLT-001",
    price: "$850.00",
    stock: 25,
    descripcion: "Juego de llantas de aleación de 18 pulgadas",
  },
];

const TablaRepuestosAdmin = () => (
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
        {repuestos.map(({ id, name, marca, numeroParte, price, stock, descripcion }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{name}</td>
            <td>{marca}</td>
            <td>{numeroParte}</td>
            <td>{price}</td>
            <td>{stock}</td>
            <td>{descripcion}</td>
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

export default TablaRepuestosAdmin;
