import Sidebar from "../components/Sidebar";
import MainAdmin from "../components/MainAdmin";
import "../css/admin.css";

const AdminHome = () => {
  return (
    <div className="d-flex bg-dark text-white min-vh-100">
      <MainAdmin />
    </div>
  );
};

export default AdminHome;
