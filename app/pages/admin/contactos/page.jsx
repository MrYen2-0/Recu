"use client";
import "../../../styles/admin/contacto.css";
import Headeradmin from "../../../components/componentes-admin/Headeradmin";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";
const socket = io(`${process.env.API_SERVER}`);


function Page() {
  const [usuario, setUsuario] = useState({});
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const route = useRouter();

  useEffect(() => {
    setUsuario(JSON.parse(localStorage.getItem("authToken")));
  }, []);
  const cita = (usuario) => {
    if (usuario.numeroTelefono) {
      return (
        <div className="cita" key={usuario._id}>
          <div>Cita:</div>
          <div>Numero de telefono:{" " + usuario.numeroTelefono}</div>
          <div>Titulo de la cita:{" " + usuario.tituloCita}</div>
          <div>Descripcion{" " + usuario.descripcionCita}</div>
        </div>
      );
    } else {
      return <div>{"Cita: sin registrar"}</div>;
    }
  };

  if (!usuario || !usuario.tipoUsuario === "admin") {
   route.push("/")
  }

  const [usuarios, setUsuarios] = useState([]);
  const [botonBusquedaDesactivado, setBotonBusquedaDesactivado] =
    useState(false);
  const [datoBusqueda, setDatobusqueda] = useState("");

  const displayUsuarios = async () => {
    try {
      const response = await fetch(`${process.env.API_SERVER}/usuario/getAll`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.resultado.length === 0) {
        return;
      }
  
      let i = 0;
      let usuarios = [];
  
      data.resultado.forEach((usuario) => {
        usuarios[i] = (
          <div key={usuario._id} className="usuario">
            <div>Nombre: {usuario.nombre}</div>
            <div>Email: {usuario.email}</div>
            <div>{cita(usuario)}</div>
            <button
              className="boton-request"
              onClick={() => iniciarChat(usuario._id)}>
              Comenzar chat
            </button>
          </div>
        );
        i++;
      });
  
      setUsuarios(usuarios);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };
  

  const iniciarChat = async (_id) => {
    localStorage.setItem("_id", _id);
    try {
      socket.emit("usuario_conectado", { userId: _id });
     route.push("/pages/admin/chat");
    } catch (error) {
      console.error("Error al iniciar el chat:", error);
    }
  };
  const filter = async (e) => {
    e.preventDefault();
  
    setUsuarios([]);
    const e_value = datoBusqueda;
  
    setBotonBusquedaDesactivado(true);
  
    if (e_value.length === "" || !e_value) {
      displayUsuarios();
      delay(3000);
      setBotonBusquedaDesactivado(false);
      return;
    }
  
    try {
      const response = await fetch(`${process.env.API_SERVER}/usuario/filtro/${e_value}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.resultado.length === 0) {
        delay(3000);
        setBotonBusquedaDesactivado(false);
        return;
      }
  
      let i = 0;
      let usuarios = [];
  
      data.resultado.forEach((usuario) => {
        usuarios[i] = (
          <div key={usuario._id} className="usuario">
            <div>Nombre: {usuario.nombre}</div>
            <div>Email: {usuario.email}</div>
            <div>{cita(usuario)}</div>
            <button
              className="boton-request"
              onClick={() => iniciarChat(usuario._id)}>
              Comenzar chat
            </button>
          </div>
        );
        i++;
      });
  
      setUsuarios(usuarios);
    } catch (error) {
      console.error(error);
    } finally {
      delay(3000);
      setBotonBusquedaDesactivado(false);
    }
  };
  

  return (
    <div>
      <div className="Contenedor-global">
        <div>
          <Headeradmin />
        </div>
        <div className="contenedor-buscador">
          <div className="titulo-buscador">
            <div className="titulo1">Buscador de </div>
            <div className="titulo2">Usuarios</div>
          </div>
        </div>
        <div className="contenedor-buscador">
          <form onSubmit={filter}>
            <label htmlFor="busqueda">
              Buscar por nombre, email o teléfono:
            </label>
            <input
              type="text"
              id="busqueda"
              name="busqueda"
              onChange={(e) => setDatobusqueda(e.target.value)}
            />
            <button type="submit" disabled={botonBusquedaDesactivado}>
              Buscar
            </button>
          </form>
        </div>
        <div className="contenedor-usuarios">{usuarios}</div>
      </div>
    </div>
  );
}

export default Page;
