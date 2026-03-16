import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoBlancoRojo from "../img/yumotors-rojo-blanco.png";
import useCartStore from "../store/cartStore";
import useAuthStore from "../store/authStore";
import "../css/header.css";

const Header = () => {
  const [showModelos, setShowModelos] = useState(false);
  const [showProductos, setShowProductos] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const totalItems = useCartStore((state) => state.getTotalItems());
  const { isAuthenticated, user, logout } = useAuthStore();
  const navigate = useNavigate();

 const toggleModelos = () => { 
    setShowModelos(!showModelos); 
    setShowProductos(false); 
    setMenuOpen(false); 
  };
  
  const toggleProductos = () => { 
    setShowProductos(!showProductos); 
    setShowModelos(false); 
  };
  
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate("/");
  };

  // Cerrar el menú de usuario al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="navbar-container">
        <a className="nav-link" href="/">
          <img className="nav-logo" src={logoBlancoRojo} alt="Yu Motors" />
        </a>

        {/* Giuliano: Hay que fijarse porque las animaciones del menu hamburguesa en responsive esta medio floja*/}
        <button
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`nav-links ${menuOpen ? "show" : ""}`}>
          <button
            className="nav-link modelos-btn"
            onClick={toggleModelos}
            aria-expanded={showModelos}
            aria-controls="modelos-dropdown"
          >
            Modelos
          </button>
          <a className="nav-link" href="/usados">Usados</a>

          <div className="productos-dropdown-wrapper">
            <button
              className="nav-link modelos-btn"
              onClick={toggleProductos}
              aria-expanded={showProductos}
            >
              Productos
            </button>
            {showProductos && (
              <div className="productos-dropdown-menu">
                <a href="/repuestos" className="nav-link-dropdown" onClick={() => setShowProductos(false)}>Repuestos</a>
                <a href="/accesorios" className="nav-link-dropdown" onClick={() => setShowProductos(false)}>Accesorios</a>
              </div>
            )}
          </div>

          <a className="nav-link" href="/concesionario">Concesionario</a>
          <a className="nav-link" href="/contacto">Contacto</a>

          {isAuthenticated ? (
            <>
              {/* Giuliano: Un lio lo del dibujo SVG, tuve que pedirle ayuda a dios*/}
              <Link to="/carrito" className="nav-link cart-icon-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="cart-icon-svg">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                {totalItems > 0 && (
                  <span className="cart-badge">{totalItems}</span>
                )}
              </Link>

              {/* Giuliano: Esta cosa bien infernal es el menu desplegable del usuario logeado, fue un parto */}
              <div className="user-dropdown-wrapper" ref={userMenuRef}>
                <button
                  className="nav-user-info nav-link"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span className="nav-user-name">Hola, {user?.nombre}</span>
                  <svg
                    className={`nav-chevron ${showUserMenu ? "open" : ""}`}
                    xmlns="http://www.w3.org/2000/svg" width="14" height="14"
                    viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {showUserMenu && (
                  <div className="user-dropdown-menu">
                    <Link
                      to="/pedidos"
                      className="user-dropdown-item nav-link-dropdown"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mis Pedidos
                    </Link>
                    <Link
                      to="/mi-posventa"
                      className="user-dropdown-item nav-link-dropdown"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mi Posventa
                    </Link>
                    <button className="user-dropdown-item nav-link-dropdown" onClick={handleLogout}>
                      Salir
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Giuliano: esto es para que el que NO esta log se le muestren los botones en vez del menu desplegable */
            <div className="nav-auth-links">
              <Link to="/login" className="nav-link nav-link-login">
                Iniciar Sesión
              </Link>
              <Link to="/login" state={{ vista: "register" }} className="nav-link nav-link-register">
                Registrarse
              </Link>
            </div>
          )}
        </nav>
      </div>

      {/* Giuliano: Menu desplegable de modelos, hay que refinarlo bastante, si tenemos tiempo añadamos img, pero dudo */}
      <div
        id="modelos-dropdown"
        className={`modelos-dropdown ${showModelos ? "show" : ""}`}
      >
        <div className="modelos-grid">
          <div className="categoria">
            <h4>Toyota</h4>
            <a href="/marcas/toyota/corolla">Corolla</a>
            <a href="/marcas/toyota/hiluxsr">Hilux SR</a>
            <a href="/marcas/toyota/sw4">SW4</a>
          </div>
          <div className="categoria">
            <h4>Lexus</h4>
            <a href="/marcas/lexus/ls">LS</a>
          </div>
          <div className="categoria">
            <h4>Gazoo Racing</h4>
            <a href="/marcas/gr/yaris">GR Yaris</a>
            <a href="/marcas/gr/gr86">GR 86</a>
            <a href="/marcas/gr/gr86">GR Supra</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;