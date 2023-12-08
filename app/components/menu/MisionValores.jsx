import React from "react";

const MisionValores = ({ mission, values, practiceAreas }) => {
  return (
    <div className="resumen-info">
      <h2>Misión y Valores</h2>
      <div className="texto-oficina">
        <a>
          {mission}
          Los valores fundamentale, {values}
          {practiceAreas}
        </a>
      </div>
    </div>
  );
};

export default MisionValores;
