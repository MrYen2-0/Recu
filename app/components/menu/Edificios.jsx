import React from "react";

const Edificios = ({ images }) => {
  return (
    <div className="contenedor-edificios">
      <div className="imagenes-edificio">
        {images.slice(3, 5).map((src, index) => (
          <img
            key={index}
            src={src}
            className="edificio"
            alt={`Edificio ${index + 1}`}
          />
        ))}
      </div>
      <div className="imagenes-edificio2">
        {images.slice(5).map((src, index) => (
          <img
            key={index}
            src={src}
            className="edificio-3"
            alt={`Edificio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Edificios;
