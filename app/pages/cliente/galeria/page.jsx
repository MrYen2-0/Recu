"use client";
import '../../../styles/clientes/galeria.css';
import Header from '../../../components/componentes-cliente/Header';
import React from 'react';
import Zoom from '../../../components/componentes-cliente/Zoom';

function Page() {
  return (
    <div>
      <div className="Contenedor-global">
      <div>
      <Header/>
    </div>
<div className="contenedor-edificiotitulo">
  <div className="titulos">
    <div className="v1_22">Edificio & </div>
    <div className="v1_23">Oficinas</div>
  </div>
</div>
        <div className="contenedor-edificios-oficinas">
        <Zoom />
 
</div>
    </div>
      </div>
  );
}

export default Page;
