import React from "react";
import HeaderUsuario from "../../components/componentes-usuario/Header";
import Firmas from "../../components/firmas/Firmas";
import "../../styles/usuarios/publicacion.css";

function Page() {
  const firmasData = [
    {
      titulo: "Jose N. Grupo Pepsico",
      descripcion:
        "Trabajador demanda despido injustificado y se acredita en el juicio ante el juez que el renunció voluntariamente...",
      imagenSrc: "/images/OIP.png",
    },
    {
      titulo: "Benjamin N vs Cristasur, S A de CV",
      descripcion:
        "Trabajador que demanda un riesgo de trabajo, alegando que perdió la vista de un ojo por un accidente que sufrió...",
      imagenSrc: "/images/CristalS.png",
    },
    {
      titulo: "Rubén N vs Tony tiendas",
      descripcion:
        "Trabajador argumenta ser despedido en una fecha y la empresa se defiende diciendo que el trabajador abandonó...",
      imagenSrc: "/images/tony.jpg",
    },
  ];

  return (
    <div>
      <div className="Contenedor-global">
        <div>
          <HeaderUsuario />
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
