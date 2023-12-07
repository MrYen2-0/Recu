// Header.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import LoginModal from './Login';
import '../../styles/admin/header.css';


const Header = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

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
      <div className="v1_161"></div>
      <Link href="/pages/admin/galeria">
        <div className="menu-item">Galeria</div>
      </Link>
      <Link href="/pages/admin/abogados">
        <div className="menu-item">Abogados</div>
      </Link>
      <Link href="/pages/admin/contactos">
      <div className="menu-item">Contactos</div>
      </Link>
      <img src="/images/IconoB_preview_rev_1.png" className="icono"/>
      <img src="/images/Sesion.png" className="imagen"/>
      <div className="container-sesion">
        <div className="imagen" onClick={handleImageClick}></div>
        {isLoginModalOpen && <LoginModal onClose={handleCloseModal} />}
      </div>
    </div>
  );
};

export default Header;
