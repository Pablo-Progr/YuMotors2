import Header from "../components/Header";
import MainPedidosUser from "../components/MainPedidosUser";
import Footer from "../components/Footer";

const PedidosUser = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <MainPedidosUser />
      <Footer />
    </div>
  );
};

export default PedidosUser;
