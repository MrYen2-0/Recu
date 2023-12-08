"use client";
import Link from 'next/link';
import LoginModal from './Login';
import '../../styles/clientes/header.css';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('https://api-aboweb-yenter.onrender.com/');


const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [chatDisponible,setChatDisponible] = useState(false);

  useEffect(() => {
    socket.on('confirmar_chat', (data) => {
      console.log(data);
      alert("un administrador ha abierto el canal de chat");
      setChatDisponible(true);
      setAdminId(data);
      //socket.emit('joinChat', {});
      //socket.emit('iniciar_chat', {idUsuarioReceptor: data.adminId});
    }, []);

    return () => {
      socket.off("activar_chat_respuesta");
      socket.off("confirmar_chat");
    }

  },[]);

  const [adminId,setAdminId] = useState('');

  const handleImageClick = () => {
    if (isLoginModalOpen) {
      setLoginModalOpen(false);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div className="contenedor-header">
      <div className="container-menuinicio">
      <Link href="/pages/cliente/menu">
        <div className="menu-item">Menú</div>
      </Link>
      <Link href="/pages/cliente/galeria">
        <div className="menu-item">Galería</div>
      </Link>
      <Link href="/pages/cliente/abogados">
        <div className="menu-item">Abogados</div>
      </Link>
      <Link href="/pages/cliente/publicaciones">
        <div className="menu-item">Firmas</div>
      </Link>
      <Link href="/pages/cliente/contactos">
      <div className="menu-item">Contactos</div>
      </Link>
      {chatDisponible ? (
          <Link href="/pages/admin/chat">
            <div className="menu-item">Chat</div>
          </Link>
      ) : null}
      </div>
      <img src="/images/IconoB_preview_rev_1.png" className="icono" alt="Descripción de la imagen"/>
      <img src="/images/Sesion.png" className="imagen" alt="Descripción de la imagen"/>
      <div className="container-sesion">
        <div className="imagen" onClick={handleImageClick}></div>
        {isLoginModalOpen && <LoginModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Header;
