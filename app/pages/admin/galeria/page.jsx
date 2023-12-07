"use client";
import "../../../styles/admin/galeria.css";
import Headeradmin from "../../../components/componentes-admin/Headeradmin";
import React, { useEffect } from "react";
import Zoom from "../../../components/componentes-admin/Zoom";
import { useRouter } from "next/navigation";

function Page() {
  const route = useRouter();

  useEffect(() => {
    try {
      const usuario = JSON.parse(localStorage.getItem("authToken"));

      if (!usuario || !(usuario.tipoUsuario === "admin")) {
        route.push()
      }
    } catch (error) {
      console.error("Error al analizar el token:", error);
      route.push("/");
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
