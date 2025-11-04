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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetricas();
  }, []);

  const fetchMetricas = async () => {
    try {
      setLoading(true);

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

  // Opciones de configuración para los gráficos
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Evolución de Ventas (Últimos 12 Meses)",
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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
        font: {
          size: 16,
          weight: "bold",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
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

      {/* Cards de resumen */}
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
                ${parseFloat(resumenGeneral.ingresos_totales || 0).toFixed(2)}
              </h3>
              <p>Ingresos Totales</p>
            </div>
          </div>

          <div className="card-resumen card-ticket-promedio">
            <i className="bi bi-receipt"></i>
            <div className="card-content">
              <h3>
                ${parseFloat(resumenGeneral.ticket_promedio || 0).toFixed(2)}
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

      {/* Gráficos */}
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
          Productos Más Vendidos
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
            <tbody className="tabla-metricas">
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
    </div>
  );
};

export default MainMetricasAdmin;
