import { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import axios from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import "../css/carrito.css";

// Estilos del PDF
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    borderBottom: "2px solid #c00",
    paddingBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#c00",
  },
  headerSubtitle: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
  },
  headerDate: {
    fontSize: 10,
    color: "#666",
    textAlign: "right",
  },
  pedidoInfo: {
    fontSize: 10,
    color: "#333",
    textAlign: "right",
    marginTop: 2,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#c00",
    padding: 8,
    borderRadius: 4,
    marginBottom: 2,
  },
  tableHeaderText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottom: "1px solid #e0e0e0",
    alignItems: "center",
  },
  tableRowAlt: {
    flexDirection: "row",
    padding: 10,
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  colProducto: { width: "35%", fontSize: 10 },
  colTipo: { width: "15%", fontSize: 10, textTransform: "capitalize" },
  colPrecio: { width: "20%", fontSize: 10, textAlign: "right" },
  colCantidad: { width: "10%", fontSize: 10, textAlign: "center" },
  colSubtotal: { width: "20%", fontSize: 10, textAlign: "right", fontWeight: "bold" },
  totalSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    paddingTop: 15,
    borderTop: "2px solid #c00",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#c00",
    marginLeft: 20,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    borderTop: "1px solid #e0e0e0",
    paddingTop: 10,
  },
  notaSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#fff5f5",
    borderRadius: 4,
    borderLeft: "3px solid #c00",
  },
  notaTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#c00",
    marginBottom: 4,
  },
  notaText: {
    fontSize: 9,
    color: "#666",
    lineHeight: 1.4,
  },
});

// Formato de precio
const formatPrice = (price) => {
  return Number(price)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

// Componente PDF
const PedidoPDF = ({ items, total, fecha, numeroPedido }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.header}>
        <View>
          <Text style={pdfStyles.headerTitle}>YU MOTORS</Text>
          <Text style={pdfStyles.headerSubtitle}>
            Comprobante de Reserva de Pedido
          </Text>
        </View>
        <View>
          <Text style={pdfStyles.headerDate}>Fecha: {fecha}</Text>
          <Text style={pdfStyles.pedidoInfo}>
            Pedido N°: {numeroPedido}
          </Text>
        </View>
      </View>

      {/* Tabla */}
      <View style={pdfStyles.tableHeader}>
        <Text style={[pdfStyles.tableHeaderText, pdfStyles.colProducto]}>
          Producto
        </Text>
        <Text style={[pdfStyles.tableHeaderText, pdfStyles.colTipo]}>
          Tipo
        </Text>
        <Text style={[pdfStyles.tableHeaderText, pdfStyles.colPrecio]}>
          Precio Unit.
        </Text>
        <Text style={[pdfStyles.tableHeaderText, pdfStyles.colCantidad]}>
          Cant.
        </Text>
        <Text style={[pdfStyles.tableHeaderText, pdfStyles.colSubtotal]}>
          Subtotal
        </Text>
      </View>

      {items.map((item, index) => (
        <View
          key={index}
          style={index % 2 === 0 ? pdfStyles.tableRow : pdfStyles.tableRowAlt}
        >
          <Text style={pdfStyles.colProducto}>{item.nombre}</Text>
          <Text style={pdfStyles.colTipo}>{item.tipoProducto}</Text>
          <Text style={pdfStyles.colPrecio}>
            ARS ${formatPrice(item.precio)}
          </Text>
          <Text style={pdfStyles.colCantidad}>{item.cantidad}</Text>
          <Text style={pdfStyles.colSubtotal}>
            ARS ${formatPrice(item.precio * item.cantidad)}
          </Text>
        </View>
      ))}

      {/* Total */}
      <View style={pdfStyles.totalSection}>
        <Text style={pdfStyles.totalLabel}>TOTAL:</Text>
        <Text style={pdfStyles.totalValue}>ARS ${formatPrice(total)}</Text>
      </View>

      {/* Nota */}
      <View style={pdfStyles.notaSection}>
        <Text style={pdfStyles.notaTitle}>IMPORTANTE</Text>
        <Text style={pdfStyles.notaText}>
          Este comprobante es una reserva de productos, no un comprobante de
          compra. Los productos serán reservados por un plazo de 48 horas. Para
          concretar la compra, acérquese a nuestro concesionario con este
          comprobante.
        </Text>
      </View>

      {/* Footer */}
      <Text style={pdfStyles.footer}>
        YU Motors - Concesionario Oficial | Este documento no tiene validez
        fiscal
      </Text>
    </Page>
  </Document>
);

const MainCarrito = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } =
    useCartStore();
  const { user, isAuthenticated } = useAuthStore();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const total = getTotalPrice();

  const handleConfirmar = () => {
    if (items.length === 0) return;
    setShowConfirmModal(true);
  };

  const handleConfirmarSi = async () => {
    setLoading(true);
    try {
      // Guardar en backend
      const payload = {
        idUsuario: isAuthenticated ? user.idUsuario : null,
        items: items.map((item) => ({
          tipoProducto: item.tipoProducto,
          idProducto: item.idProducto,
          cantidad: item.cantidad,
        })),
      };

      const response = await axios.post(
        "http://localhost:3000/api/carrito/confirmar",
        payload
      );

      const numeroPedido = response.data.idCarrito;
      const fecha = new Date().toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      // Generar PDF
      const blob = await pdf(
        <PedidoPDF
          items={items}
          total={total}
          fecha={fecha}
          numeroPedido={numeroPedido}
        />
      ).toBlob();

      saveAs(blob, `YuMotors_Pedido_${numeroPedido}.pdf`);

      // Limpiar carrito y mostrar éxito
      clearCart();
      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error al confirmar pedido:", error);
      alert("Error al confirmar el pedido. Intente nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="carrito-container">
      <h2 className="titulo-carrito">Mi Carrito</h2>

      {items.length === 0 ? (
        <div className="carrito-vacio">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="80"
            height="80"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <p>Tu carrito está vacío</p>
          <div className="carrito-vacio-links">
            <Link to="/repuestos" className="btn-seguir-comprando">
              Ver Repuestos
            </Link>
            <Link to="/accesorios" className="btn-seguir-comprando">
              Ver Accesorios
            </Link>
          </div>
        </div>
      ) : (
        <>
          {/* Tabla de productos */}
          <div className="carrito-table-wrapper">
            <table className="carrito-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th>Precio Unit.</th>
                  <th>Cantidad</th>
                  <th>Subtotal</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={`${item.tipoProducto}-${item.idProducto}`}>
                    <td className="carrito-product-cell">
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        className="carrito-product-img"
                      />
                      <div>
                        <span className="carrito-product-name">
                          {item.nombre}
                        </span>
                        <span className="carrito-product-brand">
                          {item.marca}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className={`carrito-badge-tipo ${item.tipoProducto}`}>
                        {item.tipoProducto === "repuesto"
                          ? "Repuesto"
                          : "Accesorio"}
                      </span>
                    </td>
                    <td className="carrito-price">
                      ARS ${formatPrice(item.precio)}
                    </td>
                    <td>
                      <div className="carrito-quantity-controls">
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(
                              item.idProducto,
                              item.tipoProducto,
                              item.cantidad - 1
                            )
                          }
                          disabled={item.cantidad <= 1}
                        >
                          -
                        </button>
                        <span className="qty-value">{item.cantidad}</span>
                        <button
                          className="qty-btn"
                          onClick={() =>
                            updateQuantity(
                              item.idProducto,
                              item.tipoProducto,
                              item.cantidad + 1
                            )
                          }
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="carrito-subtotal">
                      ARS ${formatPrice(item.precio * item.cantidad)}
                    </td>
                    <td>
                      <button
                        className="btn-remove-item"
                        onClick={() =>
                          removeItem(item.idProducto, item.tipoProducto)
                        }
                        title="Eliminar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen */}
          <div className="carrito-summary">
            <div className="carrito-summary-row">
              <span>Total ({items.length} producto{items.length > 1 ? "s" : ""}):</span>
              <span className="carrito-total-price">
                ARS ${formatPrice(total)}
              </span>
            </div>
            <div className="carrito-actions">
              <Link to="/repuestos" className="btn-seguir-comprando">
                Seguir comprando
              </Link>
              <button
                className="btn-confirmar-pedido"
                onClick={handleConfirmar}
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </>
      )}

      {/* Modal de confirmación */}
      {showConfirmModal && (
        <div
          className="modal-overlay-carrito"
          onClick={() => setShowConfirmModal(false)}
        >
          <div
            className="modal-content-carrito modal-confirm"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Confirmar Pedido</h3>
            <p>
              ¿Estás seguro de que deseas confirmar este pedido? Se generará un
              comprobante PDF con el detalle de tu reserva.
            </p>
            <div className="modal-confirm-total">
              <span>Total:</span>
              <span className="confirm-total-value">
                ARS ${formatPrice(total)}
              </span>
            </div>
            <div className="modal-confirm-buttons">
              <button
                className="btn-confirm-no"
                onClick={() => setShowConfirmModal(false)}
                disabled={loading}
              >
                No
              </button>
              <button
                className="btn-confirm-si"
                onClick={handleConfirmarSi}
                disabled={loading}
              >
                {loading ? "Procesando..." : "Sí, confirmar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de éxito */}
      {showSuccessModal && (
        <div className="modal-overlay-carrito">
          <div className="modal-content-carrito modal-success">
            <div className="success-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4CAF50"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h3>¡Pedido Confirmado!</h3>
            <p>
              Tu reserva ha sido registrada exitosamente. Se ha descargado el
              comprobante PDF con el detalle de tu pedido.
            </p>
            <Link
              to="/"
              className="btn-volver-inicio"
              onClick={() => setShowSuccessModal(false)}
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCarrito;
