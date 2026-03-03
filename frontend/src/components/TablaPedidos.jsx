import axios from "axios";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Paginador from "./Paginador";
import "../css/modalAdmin.css";

const ESTADOS = {
  0: { label: "Pendiente",  badge: "badge bg-warning text-dark" },
  1: { label: "Reservado",  badge: "badge bg-primary" },
  2: { label: "Retirado",   badge: "badge bg-success" },
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const TablaPedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal detalle
  const [modalDetalle, setModalDetalle] = useState(false);
  const [detallePedido, setDetallePedido] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [loadingDetalle, setLoadingDetalle] = useState(false);

  // Filtro
  const [filtro, setFiltro] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("todos");

  // Paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 8;

  const fetchPedidos = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/carrito/todos");
      setPedidos(res.data);
    } catch (error) {
      console.error("Error cargando pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const abrirDetalle = async (pedido) => {
    setPedidoSeleccionado(pedido);
    setModalDetalle(true);
    setLoadingDetalle(true);
    setDetallePedido([]);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/carrito/pedido/${pedido.idCarrito}`
      );
      setDetallePedido(res.data);
    } catch (error) {
      console.error("Error cargando detalle:", error);
    } finally {
      setLoadingDetalle(false);
    }
  };

  const cerrarDetalle = () => {
    setModalDetalle(false);
    setPedidoSeleccionado(null);
    setDetallePedido([]);
  };

  const handleCambiarEstado = async (idCarrito, nuevoEstado) => {
    try {
      await axios.put(
        `http://localhost:3000/api/carrito/estado/${idCarrito}`,
        { estado: parseInt(nuevoEstado) }
      );
      setPedidos((prev) =>
        prev.map((p) =>
          p.idCarrito === idCarrito ? { ...p, estado: parseInt(nuevoEstado) } : p
        )
      );
      Swal.fire({
        icon: "success",
        title: "Estado actualizado",
        text: `Pedido #${idCarrito} → ${ESTADOS[nuevoEstado]?.label}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error actualizando estado:", error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo actualizar el estado" });
    }
  };

  // Filtros
  const pedidosFiltrados = pedidos.filter((p) => {
    const texto = filtro.toLowerCase();
    const coincideTexto =
      p.nombre?.toLowerCase().includes(texto) ||
      p.mail?.toLowerCase().includes(texto) ||
      String(p.idCarrito).includes(texto);
    const coincideEstado =
      filtroEstado === "todos" || String(p.estado) === filtroEstado;
    return coincideTexto && coincideEstado;
  });

  const totalPaginas = Math.ceil(pedidosFiltrados.length / itemsPorPagina);
  const pedidosPaginados = pedidosFiltrados.slice(
    (paginaActual - 1) * itemsPorPagina,
    paginaActual * itemsPorPagina
  );

  // Total del modal detalle
  const totalDetalle = detallePedido.reduce(
    (acc, item) => acc + (item.precio || 0) * item.cantidad,
    0
  );

  return (
    <div className="container-fluid p-0">
      {/* Filtros */}
      <div className="d-flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          className="form-control form-control-sm bg-dark text-white border-secondary"
          placeholder="Buscar por nombre, mail o N° pedido..."
          style={{ maxWidth: "320px" }}
          value={filtro}
          onChange={(e) => { setFiltro(e.target.value); setPaginaActual(1); }}
        />
        <select
          className="form-select form-select-sm bg-dark text-white border-secondary"
          style={{ maxWidth: "180px" }}
          value={filtroEstado}
          onChange={(e) => { setFiltroEstado(e.target.value); setPaginaActual(1); }}
        >
          <option value="todos">Todos los estados</option>
          <option value="0">Pendiente</option>
          <option value="1">Reservado</option>
          <option value="2">Retirado</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center py-5 text-secondary">Cargando pedidos...</div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle text-center">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Nombre</th>
                  <th>Mail</th>
                  <th>Fecha</th>
                  <th>Detalle</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {pedidosPaginados.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-secondary py-4">
                      No hay pedidos que coincidan con el filtro
                    </td>
                  </tr>
                ) : (
                  pedidosPaginados.map((pedido) => (
                    <tr key={pedido.idCarrito}>
                      <td><span className="fw-bold text-white">#{pedido.idCarrito}</span></td>
                      <td>{pedido.nombre}</td>
                      <td className="text-secondary" style={{ fontSize: "0.85rem" }}>{pedido.mail}</td>
                      <td className="text-secondary" style={{ fontSize: "0.82rem" }}>
                        {new Date(pedido.fechaCreacion).toLocaleDateString("es-AR")}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-info"
                          onClick={() => abrirDetalle(pedido)}
                        >
                          <i className="bi bi-eye me-1"></i>Ver
                        </button>
                      </td>
                      <td>
                        <select
                          className="form-select form-select-sm bg-dark text-white border-secondary"
                          style={{ minWidth: "130px" }}
                          value={pedido.estado}
                          onChange={(e) => handleCambiarEstado(pedido.idCarrito, e.target.value)}
                        >
                          <option value={0}>Pendiente</option>
                          <option value={1}>Reservado</option>
                          <option value={2}>Retirado</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPaginas > 1 && (
            <Paginador
              paginaActual={paginaActual}
              totalPaginas={totalPaginas}
              onCambiarPagina={setPaginaActual}
            />
          )}
        </>
      )}

      {/* Modal Detalle */}
      {modalDetalle && (
        <div
          className="modal-overlay-carrito"
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1050, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={(e) => { if (e.target === e.currentTarget) cerrarDetalle(); }}
        >
          <div
            className="bg-dark text-white rounded-3 p-4"
            style={{ width: "100%", maxWidth: "680px", maxHeight: "85vh", overflowY: "auto", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="fw-bold mb-0">Pedido #{pedidoSeleccionado?.idCarrito}</h5>
                <small className="text-secondary">
                  {pedidoSeleccionado?.nombre} — {pedidoSeleccionado?.mail}
                </small>
              </div>
              <div className="d-flex align-items-center gap-3">
                <span className={ESTADOS[pedidoSeleccionado?.estado]?.badge || "badge bg-secondary"}>
                  {ESTADOS[pedidoSeleccionado?.estado]?.label}
                </span>
                <button className="btn btn-sm btn-outline-secondary" onClick={cerrarDetalle}>✕</button>
              </div>
            </div>

            {loadingDetalle ? (
              <div className="text-center py-4 text-secondary">Cargando detalle...</div>
            ) : detallePedido.length === 0 ? (
              <div className="text-center py-4 text-secondary">Sin items registrados</div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-dark table-bordered align-middle text-center" style={{ fontSize: "0.9rem" }}>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detallePedido.map((item) => (
                        <tr key={item.idItem}>
                          <td className="text-start">{item.nombre || "—"}</td>
                          <td>
                            <span className={`badge ${item.tipoProducto === "repuesto" ? "bg-primary" : "bg-danger"}`}>
                              {item.tipoProducto}
                            </span>
                          </td>
                          <td>{item.cantidad}</td>
                          <td>{currencyFormatter.format(item.precio || 0)}</td>
                          <td>{currencyFormatter.format((item.precio || 0) * item.cantidad)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="4" className="text-end fw-bold">Total del Pedido:</td>
                        <td className="fw-bold text-success fs-6">{currencyFormatter.format(totalDetalle)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TablaPedidos;
