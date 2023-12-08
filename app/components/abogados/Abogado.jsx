import React from "react";

const Abogado = ({ nombre, descripcion, area }) => {
  return (
    <div className="cuadros-abogados">
      <div className="texto-abogado">
        <div className="titulo-abogado">{nombre}</div>
        <div className="descripcion-abogado">{descripcion}</div>
      </div>
      <div className="imagen-abogado">
        <img src="/images/persona.png" className="persona-abogado" alt="persona-abogado" />
      </div>
      <div className="areas-abogado">{area}</div>
    </div>
  );
};

export default Abogado;
