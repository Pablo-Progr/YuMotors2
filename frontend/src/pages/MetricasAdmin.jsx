import Sidebar from "../components/Sidebar";
import MainMetricasAdmin from "../components/MainMetricasAdmin";
import "../css/MetricasAdmin.css";

const MetricasAdmin = () => {
  return (
    <div className="metricas-admin-container">
      <Sidebar />
      <MainMetricasAdmin />
    </div>
  );
};

export default MetricasAdmin;
