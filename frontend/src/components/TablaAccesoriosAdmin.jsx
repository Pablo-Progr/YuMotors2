const accessories = [
  {
    name: 'Llantas de Aleación 18"',
    sku: "LLT-001",
    price: "€850.00",
    stock: 25,
    active: true,
  },
  {
    name: "Kit de Luces LED",
    sku: "LUZ-015",
    price: "€230.00",
    stock: 150,
    active: true,
  },
  {
    name: "Spoiler Trasero Deportivo",
    sku: "SPL-003",
    price: "€450.00",
    stock: 8,
    active: false,
  },
  {
    name: "Sistema de Sonido Premium",
    sku: "SND-112",
    price: "€1200.00",
    stock: 42,
    active: true,
  },
  {
    name: "Alfombrillas Personalizadas",
    sku: "ALF-077",
    price: "€150.00",
    stock: 75,
    active: true,
  },
];

const TablaAccesoriosAdmin = () => (
  <div className="table-responsive p-3 rounded">
    <table className="table table-dark table-hover align-middle">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>SKU</th>
          <th>Precio</th>
          <th>Stock</th>
          <th>Estado</th>
          <th className="text-end">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {accessories.map(({ name, sku, price, stock, active }) => (
          <tr key={sku}>
            <td>{name}</td>
            <td className="text-muted">{sku}</td>
            <td>{price}</td>
            <td>{stock}</td>
            <td>
              <span className={`badge ${active ? "bg-success" : "bg-danger"}`}>
                {active ? "Activo" : "Inactivo"}
              </span>
            </td>
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

export default TablaAccesoriosAdmin;
