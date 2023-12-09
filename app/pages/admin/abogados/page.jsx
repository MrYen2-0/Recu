"use client";
import { useState } from 'react';
import '../../../styles/admin/adminabogado.css';
import Headeradmin from '../../../components/componentes-admin/Headeradmin'; // Asegúrate de importar Header desde el lugar correcto
import { useEffect } from 'react';
import axios from 'axios';
function Page() {
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('authToken'));
    if (!usuario || !usuario.tipoUsuario === "admin") {
      window.location.href = "/";
    }
  }, []);

  const [showForm, setShowForm] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [nombre,setNombre] = useState('');
  const [area,setArea] = useState('');
  const [descripcion,setDescripcion] = useState('');
  const [nombreDel,setNombreDel] = useState('');
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
  
      let abogados = [];
      let i = 0;
  
      data.resultado.forEach((abogado) => {
        abogados[i] = (
          <div className="cuadros-abogados" key={abogado._id}>
            <div className="texto-abogado">
              <div className="titulo-abogado">{abogado.nombre}</div>
              <div className="descripcion-abogado">{abogado.descripcion}</div>
            </div>
            <div className="imagen-abogado">
              <img src="/images/persona.png" className="persona-abogado" alt="persona-abogado" />
            </div>
            <div className="areas-abogado">{abogado.area}</div>
          </div>
        );
        i++;
      });
  
      setAbogados(abogados);
    } catch (error) {
      alert(error.message);
    }
  };
  

  useEffect(() => {
    displayAbogados();
  },[]);

  const handleAgregarAbogado = async () => {
    if (nombre === '' || area === '' || descripcion === '') {
      alert("Favor de ingresar todos los datos");
      return;
    }
  
    const data = {
      nombre: nombre,
      area: area,
      descripcion: descripcion
    };
  
    try {
      const response = await fetch(`${process.env.API_SERVER}/abogado/agregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      alert(responseData.message);
    } catch (error) {
      alert(error.message);
    }
  };
  
  const handleEliminarAbogado = async () => {
    if (nombreDel === '' || nombreDel.length === 0) {
      alert("Favor de ingresar el nombre del abogado");
      return;
    }
  
    try {
      const response = await fetch(`${process.env.API_SERVER}/abogado/eliminar/${nombreDel}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
      alert(responseData.message);
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <div>
      <div className="Contenedor-global">
      <div>
      <Headeradmin />
    </div>
    <div className="contenedor-titulo">
  <div className="titulos">
    <div className="titulo3">Abogados </div>
    <div className="titulo4">De la firma</div>
  </div>
  <div className="botones">
    <button className="boton" onClick={() => setShowForm(true)}>Agregar abogado</button>
    <button className="boton" style={{backgroundColor: 'red'}} onClick={() => setShowDeleteForm(true)}>Eliminar abogado</button>
  </div>
  {showForm && (
    <div className="overlay">
    <div className="formulario-abogado">
      <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" placeholder="Nombre" onChange={(e) => setNombre(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="area">Área de práctica:</label>
        <input type="text" id="area" placeholder="Área de práctica" onChange={(e) => setArea(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" placeholder="Descripción" onChange={(e) => setDescripcion(e.target.value)}></textarea>
      </div>

      <div className="botones">
        <button style={{ backgroundColor: 'red' }} onClick={() => setShowForm(false)}>Cancelar</button>
        <button onClick={handleAgregarAbogado}>Aceptar</button>
      </div>
    </div>
  </div>
  
  )}
  {showDeleteForm && (
    <div className="overlay">
      <div className="formulario-abogado">
        <input type="text" placeholder="Nombre del abogado a eliminar" onChange={(e) => setNombreDel(e.target.value)}/>
        <div className="botones">
        <button style={{backgroundColor: 'blue'}} onClick={() => setShowDeleteForm(false)}>Cerrar</button>
        <button style={{backgroundColor: 'red'}} onClick={handleEliminarAbogado}>Borrar</button>
      </div>      
      </div>
    </div>
  )}
</div>

        <div className="contenedor-abogados">
          <div className="imagenes-abogados">
          {abogados}
          </div>
      </div>
    </div>
  </div>
  );
}

export default Page;
