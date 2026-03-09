import { useEffect, useState, Fragment } from "react";
import useAuthStore from "../store/authStore";
import axios from "axios";
import Swal from "sweetalert2";
import "../css/pedidosUser.css";

const EstadoBadge = ({ estado }) => {
  if (estado === 0) return <span className="pedidos-badge pedidos-badge-pendiente">Pendiente</span>;
  if (estado === 1) return <span className="pedidos-badge pedidos-badge-reservado">Reservado</span>;
  if (estado === 2) return <span className="pedidos-badge pedidos-badge-retirado">Retirado</span>;
  return null;
};

const MainPedidosUser = () => {
  const { user } = useAuthStore();
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);
  const [detalles, setDetalles] = useState({});

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/carrito/pedidos/${user.idUsuario}`
        );
        setPedidos(res.data);
      } catch (err) {
        console.error("Error al obtener pedidos:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user?.idUsuario) fetchPedidos();
  }, [user]);

  const toggleDetalle = async (idCarrito) => {
    if (expandedId === idCarrito) {
      setExpandedId(null);
      return;
    }
    setExpandedId(idCarrito);
    if (!detalles[idCarrito]) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/carrito/pedido/${idCarrito}`
        );
        setDetalles((prev) => ({ ...prev, [idCarrito]: res.data }));
      } catch (err) {
        console.error("Error al obtener detalle del pedido:", err);
      }
    }
  };

  const eliminarPedido = async (idCarrito) => {
    const result = await Swal.fire({
      title: "¿Eliminar pedido?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e60012",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/api/carrito/${idCarrito}`);
      setPedidos((prev) => prev.filter((p) => p.idCarrito !== idCarrito));
      if (expandedId === idCarrito) setExpandedId(null);
      Swal.fire({
        icon: "success",
        title: "Pedido eliminado",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.error || "No se pudo eliminar el pedido.",
      });
    }
  };

  return (
    <section className="pedidos-user-section">
      <div className="pedidos-user-container">
        <h2 className="pedidos-user-title">Mis Pedidos</h2>

        {loading ? (
          <div className="pedidos-loading">Cargando pedidos...</div>
        ) : pedidos.length === 0 ? (
          <div className="pedidos-empty">No tenés pedidos realizados.</div>
        ) : (
          <div className="pedidos-table-wrapper">
            <table className="pedidos-table">
              <thead>
                <tr>
                  <th>N° Pedido</th>
                  <th>Fecha</th>
                  <th>Estado</th>
                  <th>Detalle</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <Fragment key={pedido.idCarrito}>
                    <tr>
                      <td>#{pedido.idCarrito}</td>
                      <td>
                        {new Date(pedido.fechaCreacion).toLocaleDateString(
                          "es-AR"
                        )}
                      </td>
                      <td>
                        <EstadoBadge estado={pedido.estado} />
                      </td>
                      <td>
                        <button
                          className="pedidos-btn-detalle"
                          onClick={() => toggleDetalle(pedido.idCarrito)}
                        >
                          {expandedId === pedido.idCarrito
                            ? "Ocultar"
                            : "Ver detalle"}
                        </button>
                      </td>
                      <td>
                        <button
                          className="pedidos-btn-eliminar"
                          onClick={() => eliminarPedido(pedido.idCarrito)}
                          disabled={pedido.estado === 2}
                          title={
                            pedido.estado === 2
                              ? "No se puede eliminar un pedido ya retirado"
                              : "Eliminar pedido"
                          }
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>

                    {expandedId === pedido.idCarrito && (
                      <tr className="pedidos-detalle-row">
                        <td colSpan="5">
                          {detalles[pedido.idCarrito] ? (
                            detalles[pedido.idCarrito].length === 0 ? (
                              <p>No hay items en este pedido.</p>
                            ) : (
                              <table className="pedidos-items-table">
                                <thead>
                                  <tr>
                                    <th>Producto</th>
                                    <th>Tipo</th>
                                    <th>Cantidad</th>
                                    <th>Precio unit.</th>
                                    <th>Subtotal</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {detalles[pedido.idCarrito].map((item) => (
                                    <tr key={item.idItem}>
                                      <td>{item.nombre}</td>
                                      <td style={{ textTransform: "capitalize" }}>
                                        {item.tipoProducto}
                                      </td>
                                      <td>{item.cantidad}</td>
                                      <td>
                                        ${Number(item.precio).toLocaleString("es-AR")}
                                      </td>
                                      <td>
                                        ${(Number(item.precio) * item.cantidad).toLocaleString("es-AR")}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            )
                          ) : (
                            <p>Cargando detalle...</p>
                          )}
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default MainPedidosUser;
