import React from "react";
import Abogado from "./Abogado";

const Abogados = ({ abogadosData }) => {
  return (
    <div className="contenedor-abogados">
      <div className="imagenes-abogados">
        {abogadosData.map((abogado) => (
          <Abogado
            key={abogado._id}
            nombre={abogado.nombre}
            descripcion={abogado.descripcion}
            area={abogado.area}
          />
        ))}
      </div>
    </div>
  );
};

export default Abogados;
