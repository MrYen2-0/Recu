"use client";
import React, { useState, useEffect } from 'react';
import '../../styles/usuarios/abogado.css';
import HeaderUsuario from '../../components/componentes-usuario/Header';
import Abogados from "../../components/abogados/Abogados";

function Page() {
  const [abogados, setAbogados] = useState([]);

  const displayAbogados = async () => {
    try {
      const response = await fetch("https://api-aboweb-yenter.onrender.com/abogado/getAll");
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.resultado.length === 0) {
        console.log("No hay abogados");
        return;
      }

      let abogados = data.resultado.map((abogado) => ({
        _id: abogado._id,
        nombre: abogado.nombre,
        descripcion: abogado.descripcion,
        area: abogado.area,
      }));

      setAbogados(abogados);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    displayAbogados();
  }, []);

  return (
    <div>
      <div className="Contenedor-global">
        <div>
          <HeaderUsuario />
        </div>
        <div className="contenedor-tituloabogados">
          <div className="titulos">
            <div className="titulo3">Abogados </div>
            <div className="titulo4">De la firma</div>
          </div>
        </div>
        <Abogados abogadosData={abogados} />
      </div>
    </div>
  );
}

export default Page;
