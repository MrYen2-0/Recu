import React from "react";
import "../../styles/usuarios/publicacion.css";

const Firma = ({ titulo, descripcion, imagenSrc }) => {
  return (
    <div className="v1_56">
      <div className="texto-firmas">
        <div className="titulo-firmas">{titulo}</div>
        <div className="descripcion-firmas">{descripcion}</div>
      </div>
      <img src={imagenSrc} className="imagen-firmas" alt={titulo} />
    </div>
  );
};

export default Firma;
