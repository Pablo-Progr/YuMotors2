import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import "../css/MetricasAdmin.css";

// Registrar componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const MainMetricasAdmin = () => {
  const [ventasPorMes, setVentasPorMes] = useState([]);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [resumenGeneral, setResumenGeneral] = useState(null);
  const [comparativoMensual, setComparativoMensual] = useState([]);

  // Estados para repuestos
  const [ventasRepuestosPorMes, setVentasRepuestosPorMes] = useState([]);
  const [repuestosMasVendidos, setRepuestosMasVendidos] = useState([]);
  const [resumenGeneralRepuestos, setResumenGeneralRepuestos] = useState(null);
  const [comparativoMensualRepuestos, setComparativoMensualRepuestos] =
    useState([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("accesorios"); // 'accesorios' o 'repuestos'

  useEffect(() => {
    fetchMetricas();
  }, []);

  const fetchMetricas = async () => {
    try {
      setLoading(true);

      // ===== FETCH ACCESORIOS =====
      // Fetch ventas por mes
      const ventasRes = await fetch(
        "http://localhost:3000/api/metricas/ventas-por-mes"
      );
      const ventasData = await ventasRes.json();
      if (ventasData.success) {
        setVentasPorMes(ventasData.data);
      }

      // Fetch productos más vendidos
      const productosRes = await fetch(
        "http://localhost:3000/api/metricas/productos-mas-vendidos"
      );
      const productosData = await productosRes.json();
      if (productosData.success) {
        setProductosMasVendidos(productosData.data);
      }

      // Fetch resumen general
      const resumenRes = await fetch(
        "http://localhost:3000/api/metricas/resumen-general"
      );
      const resumenData = await resumenRes.json();
      if (resumenData.success) {
        setResumenGeneral(resumenData.data);
      }

      // Fetch comparativo mensual
      const comparativoRes = await fetch(
        "http://localhost:3000/api/metricas/comparativo-mensual"
      );
      const comparativoData = await comparativoRes.json();
      if (comparativoData.success) {
        setComparativoMensual(comparativoData.data);
      }

      // ===== FETCH REPUESTOS =====
      // Fetch ventas de repuestos por mes
      const ventasRepuestosRes = await fetch(
        "http://localhost:3000/api/metricas/repuestos/ventas-por-mes"
      );
      const ventasRepuestosData = await ventasRepuestosRes.json();
      if (ventasRepuestosData.success) {
        setVentasRepuestosPorMes(ventasRepuestosData.data);
      }

      // Fetch repuestos más vendidos
      const repuestosRes = await fetch(
        "http://localhost:3000/api/metricas/repuestos/mas-vendidos"
      );
      const repuestosData = await repuestosRes.json();
      if (repuestosData.success) {
        setRepuestosMasVendidos(repuestosData.data);
      }

      // Fetch resumen general repuestos
      const resumenRepuestosRes = await fetch(
        "http://localhost:3000/api/metricas/repuestos/resumen-general"
      );
      const resumenRepuestosData = await resumenRepuestosRes.json();
      if (resumenRepuestosData.success) {
        setResumenGeneralRepuestos(resumenRepuestosData.data);
      }

      // Fetch comparativo mensual repuestos
      const comparativoRepuestosRes = await fetch(
        "http://localhost:3000/api/metricas/repuestos/comparativo-mensual"
      );
      const comparativoRepuestosData = await comparativoRepuestosRes.json();
      if (comparativoRepuestosData.success) {
        setComparativoMensualRepuestos(comparativoRepuestosData.data);
      }
    } catch (error) {
      console.error("Error fetching métricas:", error);
    } finally {
      setLoading(false);
    }
  };

  // Preparar datos para el gráfico de ventas por mes
  const meses = [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Datos para ACCESORIOS
  const ventasPorMesData = {
    labels: ventasPorMes.map((v) => `${meses[v.mes - 1]} ${v.anio}`),
    datasets: [
      {
        label: "Ventas ($)",
        data: ventasPorMes.map((v) => v.monto_total),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.3,
      },
      {
        label: "Cantidad de Ventas",
        data: ventasPorMes.map((v) => v.total_ventas),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        tension: 0.3,
      },
    ],
  };

  // Preparar datos para productos más vendidos
  const productosMasVendidosData = {
    labels: productosMasVendidos.map((p) => p.nombre),
    datasets: [
      {
        label: "Unidades Vendidas",
        data: productosMasVendidos.map((p) => p.total_vendido),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(199, 199, 199, 0.7)",
          "rgba(83, 102, 255, 0.7)",
          "rgba(255, 99, 255, 0.7)",
          "rgba(99, 255, 132, 0.7)",
        ],
      },
    ],
  };

  // Datos para REPUESTOS
  const ventasRepuestosPorMesData = {
    labels: ventasRepuestosPorMes.map((v) => `${meses[v.mes - 1]} ${v.anio}`),
    datasets: [
      {
        label: "Ventas ($)",
        data: ventasRepuestosPorMes.map((v) => v.monto_total),
        borderColor: "rgb(255, 159, 64)",
        backgroundColor: "rgba(255, 159, 64, 0.5)",
        tension: 0.3,
      },
      {
        label: "Cantidad de Ventas",
        data: ventasRepuestosPorMes.map((v) => v.total_ventas),
        borderColor: "rgb(153, 102, 255)",
        backgroundColor: "rgba(153, 102, 255, 0.5)",
        tension: 0.3,
      },
    ],
  };

  // Preparar datos para repuestos más vendidos
  const repuestosMasVendidosData = {
    labels: repuestosMasVendidos.map((r) => r.nombre),
    datasets: [
      {
        label: "Unidades Vendidas",
        data: repuestosMasVendidos.map((r) => r.total_vendido),
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(199, 199, 199, 0.7)",
          "rgba(83, 102, 255, 0.7)",
          "rgba(255, 99, 255, 0.7)",
          "rgba(99, 255, 132, 0.7)",
        ],
      },
    ],
  };

  // Opciones de configuración para los gráficos
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      title: {
        display: true,
        text: "Evolución de Ventas (Últimos 12 Meses)",
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Top 10 Productos Más Vendidos",
        color: "white",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: "white",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="main-metricas-admin">
        <div className="loading-container">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="main-metricas-admin">
      <div className="metricas-header">
        <h1>
          <i className="bi bi-graph-up-arrow me-2"></i>
          Panel de Métricas
        </h1>
        <button className="btn btn-primary" onClick={fetchMetricas}>
          <i className="bi bi-arrow-clockwise me-2"></i>
          Actualizar
        </button>
      </div>

      {/* Pestañas de navegación */}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "accesorios" ? "active" : ""}`}
            onClick={() => setActiveTab("accesorios")}
          >
            <i className="bi bi-gear me-2"></i>
            Accesorios
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "repuestos" ? "active" : ""}`}
            onClick={() => setActiveTab("repuestos")}
          >
            <i className="bi bi-tools me-2"></i>
            Repuestos
          </button>
        </li>
      </ul>

      {/* Contenido según pestaña activa */}
      {activeTab === "accesorios" ? (
        <>
          {/* Cards de resumen ACCESORIOS */}
          {resumenGeneral && (
            <div className="resumen-cards">
              <div className="card-resumen card-total-ventas">
                <i className="bi bi-cart-check"></i>
                <div className="card-content">
                  <h3>{resumenGeneral.total_ventas || 0}</h3>
                  <p>Total Ventas</p>
                </div>
              </div>

              <div className="card-resumen card-ingresos">
                <i className="bi bi-currency-dollar"></i>
                <div className="card-content">
                  <h3>
                    $
                    {parseFloat(resumenGeneral.ingresos_totales || 0).toFixed(
                      2
                    )}
                  </h3>
                  <p>Ingresos Totales</p>
                </div>
              </div>

              <div className="card-resumen card-ticket-promedio">
                <i className="bi bi-receipt"></i>
                <div className="card-content">
                  <h3>
                    $
                    {parseFloat(resumenGeneral.ticket_promedio || 0).toFixed(2)}
                  </h3>
                  <p>Ticket Promedio</p>
                </div>
              </div>

              <div className="card-resumen card-productos-vendidos">
                <i className="bi bi-box-seam"></i>
                <div className="card-content">
                  <h3>{resumenGeneral.total_productos_vendidos || 0}</h3>
                  <p>Productos Vendidos</p>
                </div>
              </div>
            </div>
          )}

          {/* Gráficos ACCESORIOS */}
          <div className="graficos-container">
            <div className="grafico-card grafico-grande">
              <Line data={ventasPorMesData} options={lineOptions} />
            </div>

            <div className="grafico-card grafico-mediano">
              <Bar data={productosMasVendidosData} options={barOptions} />
            </div>
          </div>

          {/* Tabla de productos más vendidos */}
          <div className="tabla-productos-container">
            <h3>
              <i className="bi bi-trophy me-2"></i>
              Accesorios Más Vendidos
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Producto</th>
                    <th>Marca</th>
                    <th>Unidades Vendidas</th>
                    <th>Ingresos Totales</th>
                  </tr>
                </thead>
                <tbody>
                  {productosMasVendidos.map((producto, index) => (
                    <tr key={producto.idAccesorio}>
                      <td>{index + 1}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.marca}</td>
                      <td>{producto.total_vendido}</td>
                      <td className="text-success fw-bold">
                        ${parseFloat(producto.ingresos_totales).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Cards de resumen REPUESTOS */}
          {resumenGeneralRepuestos && (
            <div className="resumen-cards">
              <div className="card-resumen card-total-ventas">
                <i className="bi bi-cart-check"></i>
                <div className="card-content">
                  <h3>{resumenGeneralRepuestos.total_ventas || 0}</h3>
                  <p>Total Ventas</p>
                </div>
              </div>

              <div className="card-resumen card-ingresos">
                <i className="bi bi-currency-dollar"></i>
                <div className="card-content">
                  <h3>
                    $
                    {parseFloat(
                      resumenGeneralRepuestos.ingresos_totales || 0
                    ).toFixed(2)}
                  </h3>
                  <p>Ingresos Totales</p>
                </div>
              </div>

              <div className="card-resumen card-ticket-promedio">
                <i className="bi bi-receipt"></i>
                <div className="card-content">
                  <h3>
                    $
                    {parseFloat(
                      resumenGeneralRepuestos.ticket_promedio || 0
                    ).toFixed(2)}
                  </h3>
                  <p>Ticket Promedio</p>
                </div>
              </div>

              <div className="card-resumen card-productos-vendidos">
                <i className="bi bi-box-seam"></i>
                <div className="card-content">
                  <h3>
                    {resumenGeneralRepuestos.total_productos_vendidos || 0}
                  </h3>
                  <p>Repuestos Vendidos</p>
                </div>
              </div>
            </div>
          )}

          {/* Gráficos REPUESTOS */}
          <div className="graficos-container">
            <div className="grafico-card grafico-grande">
              <Line data={ventasRepuestosPorMesData} options={lineOptions} />
            </div>

            <div className="grafico-card grafico-mediano">
              <Bar data={repuestosMasVendidosData} options={barOptions} />
            </div>
          </div>

          {/* Tabla de repuestos más vendidos */}
          <div className="tabla-productos-container">
            <h3>
              <i className="bi bi-trophy me-2"></i>
              Repuestos Más Vendidos
            </h3>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Repuesto</th>
                    <th>Marca</th>
                    <th>Unidades Vendidas</th>
                    <th>Ingresos Totales</th>
                  </tr>
                </thead>
                <tbody>
                  {repuestosMasVendidos.map((repuesto, index) => (
                    <tr key={repuesto.idRepuesto}>
                      <td>{index + 1}</td>
                      <td>{repuesto.nombre}</td>
                      <td>{repuesto.marca}</td>
                      <td>{repuesto.total_vendido}</td>
                      <td className="text-success fw-bold">
                        ${parseFloat(repuesto.ingresos_totales).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainMetricasAdmin;
