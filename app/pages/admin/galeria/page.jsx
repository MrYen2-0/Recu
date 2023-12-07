"use client";
import '../../../styles/admin/galeria.css';
import Headeradmin from '../../../components/componentes-admin/Headeradmin';
import React from 'react';
import Zoom from '../../../components/componentes-admin/Zoom';
import { useEffect } from 'react';

function Page() {

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('authToken'));

    if (!usuario || !usuario.tipoUsuario === "admin") {
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      <div className="Contenedor-global">
      <div>
      <Headeradmin />
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
