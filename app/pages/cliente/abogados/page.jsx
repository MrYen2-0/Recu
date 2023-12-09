"use client";
import React, { useState, useEffect } from 'react';
import '../../../styles/clientes/abogado.css';
import Header from '../../../components/componentes-cliente/Header';
import Abogados from "../../components/abogados/Abogados";

function Page() {
    const [abogados,setAbogados] = useState([]);

    const displayAbogados = async () => {
      try {
        const response = await fetch(`${process.env.API_SERVER}/abogado/getAll`);
        
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
      <Header />
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
