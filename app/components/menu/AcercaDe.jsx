import React from "react";

const AcercaDe = ({ images }) => {
  return (
    <div className="imagenes">
      {images.slice(0, 3).map((src, index) => (
        <img
          key={index}
          src={src}
          className="oficinas1"
          alt={`Oficina ${index + 1}`}
        />
      ))}
      <div className="texto-info">
        <div className="info-titulo">Acerca de la empresa</div>
        <div className="info-descripcion">
          Desde el año 2004, la empresa se crea con la finalidad de prestar
          servicios profesionales de alta calidad para los clientes, donde desde
          esa fecha a la actualidad se cuenta con clientes satisfechos con los
          servicios prestados en materia del trabajo.
        </div>
      </div>
    </div>
  );
};

export default AcercaDe;
