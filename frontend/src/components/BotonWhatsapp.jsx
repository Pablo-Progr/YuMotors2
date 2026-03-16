import "../css/botonWhatsapp.css";

const BotonWhatsapp = () => {
  
  const numeroWhatsapp = "5493815085070"; // Jeremias: ¿Y a ustedes quien les dio permiso de usar mi numero?

  const mensajePredefinido = "¡Hola!"; // Jeremias: Hay que fijarse de cambiar este mensaje, queda... corto.
  

  const urlWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensajePredefinido)}`;



  const handleClick = () => {
    window.open(urlWhatsapp, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="whatsapp-container">
      <div className="whatsapp-tooltip" >Contactate con nosotros!</div>
      
      <button
      // Jeremias: OJO CON ESTO, esta muy lindo peeeero cuando haces scroll al final, tapa un par de botones en el footer.
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
