import "../css/botonWhatsapp.css";

const BotonWhatsapp = () => {
  // Número de WhatsApp (sin el +, solo el código de país y número)
  const numeroWhatsapp = "5493815085070"; // Cambia este número por el tuyo
  
  // Mensaje predefinido
  const mensajePredefinido = "¡Hola!";
  
  // URL de WhatsApp con el mensaje codificado
  const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensajePredefinido)}`;

  const handleClick = () => {
    window.open(urlWhatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="whatsapp-container">
      <div className="whatsapp-tooltip">Contactate con nosotros!</div>
      <button
        className="boton-whatsapp"
        onClick={handleClick}
        title="Contáctanos por WhatsApp"
        aria-label="Contactar por WhatsApp"
      >
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
          alt="WhatsApp"
          className="whatsapp-icon"
        />
      </button>
    </div>
  );
};

export default BotonWhatsapp;
