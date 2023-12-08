// Firmas.js
import React from "react";
import Firma from "./Firma";
import "../../styles/usuarios/publicacion.css";


const Firmas = ({ firmasData }) => {
  return (
    <div className="contenedor-firmas">
      {firmasData.map((firma, index) => (
        <Firma
          key={index}
          titulo={firma.titulo}
          descripcion={firma.descripcion}
          imagenSrc={firma.imagenSrc}
        />
      ))}
    </div>
  );
};

export default Firmas;
