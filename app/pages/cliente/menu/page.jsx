"use client";
import '../../../styles/clientes/menu.css';
import Header from '../../../components/componentes-cliente/Header';  
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AcercaDe from "../../../components/menu/AcercaDe";
import MisionValores from "../../../components/menu/MisionValores";
import Edificios from "../../../components/menu/Edificios";

function Page() {
  const mission = "Cuidado y defensa de los intereses de nuestros clientes en materia del trabajo.";
  const values = "son: profesionalismo, honradez, calidad en el servicio, lealtad. Ofrecemos defensa en";
  const practiceAreas = `.
  juicios laborales y ante instancias superiores. Cuantificamos y 
  asesoramos a los clientes en cuanto a la cuantía que corresponde 
  en caso de un posible despido, y realizamos las gestiones para 
  poder conciliar y evitar posibles desgastes dentro de un juicio 
  laboral. Asesoramos desde el inicio de un juicio hasta su total 
  culminación, pasando por todas las fases, dando seguimiento de manera 
  oportuna y cuidando los intereses de nuestros clientes`;

  const images = [
    "/images/oficinas12.jpg",
    "/images/oficinas13.jpg",
    "/images/oficinas14.jpg",
    "/images/oficinas18.jpg",
    "/images/oficinas10.jpg",
    "/images/oficinas15.jpg",
    "/images/oficinas16.jpg",
    "/images/oficinas17.jpg"
  ];

  return (
    <div className="Contenedor-global">
      <Header />
      <div className="contenedor-titulo">
        <div className="titulos">
          <div className="v1_22">Garcia & </div>
          <div className="v1_23">Caceres Gonzales</div>
        </div>
        <div className="titulo-edificio">
    <Carousel>
      <div>
        <img src="/images/edificio11.jpg" alt="Edificio 1"/>
      </div>
      <div>
        <img src="/images/edificio12.jpg" alt="Edificio 2"/>
      </div>
      <div>
        <img src="/images/edificio13.jpg" alt="Edificio 3"/>
      </div>
    </Carousel>
  </div>
      </div>
      <AcercaDe images={images} />
      <div className="contenedor-resumen">
        <MisionValores mission={mission} values={values} practiceAreas={practiceAreas} />
        <Edificios images={images} />
      </div>
    </div>
  );
}

export default Page;
