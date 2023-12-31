// Footer.js
import '../../styles/clientes/Footer.css';

const Footer = () => {
    return(
      <div className="contenedor-footer">
      <div className="footer-container">
        <div className="footer-info">
    <div className="v1_125">Informacion</div>
    <div className="v1_120">Menu</div>
    <div className="v1_121">Galeria</div>
    <div className="v1_122">Abogado</div>
    <div className="v1_123">Contactos</div>
    <div className="v1_124">Publicaciones</div>
    </div>

    <div className="footer-info">
    <div className="v1_126">Contactos</div>
    <div className="v1_136">1234 Sample Street Austin Texas 78704</div>
    <div className="v1_117">512.333.2222</div>
    <div className="v1_118">sampleemail@gmail.com</div>
    </div>

    <div className="footer-info">
        <div className="v1_102">Medios sociales</div>
        <img src="/images/facebook.png" className="v1_104" alt="Descripción de la imagen"/>
        <img src="/images/twitter2.png" className="v1_106" alt="Descripción de la imagen"/>
      </div>
      </div>
      <div className="v1_98"></div>
        <div className="v1_99">© 2023 Todos los derechos reservados</div>
    </div>
    );
};
  
  export default Footer;
  