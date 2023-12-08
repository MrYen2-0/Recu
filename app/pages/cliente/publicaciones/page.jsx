import '../../../styles/clientes/publicacion.css';
import Header from '../../../components/componentes-cliente/Header';
import React from "react";
import Firmas from "../../../components/firmas/Firmas";


function Page() {
  return (
    <div>
      <div className="Contenedor-global">
      <div>
      <Header />
    </div>
    <div className="contenedor-titulofirmas">
          <div className="titulos">
            <div className="v1_22">Nuestras </div>
            <div className="v1_23">firmas</div>
          </div>
        </div>
        
        <Firmas firmasData={firmasData} />
      </div>
  </div>
  );
}

export default Page;
