"use client";
import '../../styles/usuarios/galeria.css';
import HeaderUsuario from '../../components/componentes-usuario/Header';
import React from 'react';
import Zoom from '../../components/componentes-usuario/Zoom';
function Page() {
  return (
    <div>
      <div className="Contenedor-global">
      <div>
      <HeaderUsuario/>
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
