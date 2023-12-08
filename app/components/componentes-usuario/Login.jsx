"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import { Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

const socket = io("https://api-aboweb-yenter.onrender.com");

const RegisterModal = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const nameRef = useRef(null);

  const toggle = () => setVisible(!visible);

  const changeMessage = (text) => setMessage(text);

  const handleRegister = async () => {
    const nombre = nameRef.current.value;
    const resultado = validarNombre(nombre);
    
    if (!resultado) {
      changeMessage("El nombre no es válido");
      toggle();
      return;
    }
  
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      changeMessage("Favor de ingresar todos los datos");
      toggle();
      return;
    }
  
    if (!(password === confirmPassword)) {
      changeMessage("Contraseñas no coinciden");
      toggle();
      return;
    }
  
    const emailRegex = new RegExp(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
  
    if (!emailRegex.test(email)) {
      changeMessage("Formato de email inválido");
      toggle();
      return;
    }
  
    const data = {
      nombre: name,
      email: email,
      contrasenia: password,
    };
  
    try {
      const response = await fetch("https://api-aboweb-yenter.onrender.com/usuario/registrarse", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      changeMessage("Felicidades por registrarte, ahora inicia sesión para continuar.");
      toggle();
    } catch (error) {
      changeMessage("Ha habido un error " + error.message);
      toggle();
    }
  };
  

  function validarNombre(valor) {
    var regex = /^[A-Za-z]+$/;
    return regex.test(valor);
  }

  return (
    <div className="login-modal-sesion">
      <div className="register-content">
        <h2>Registro</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          ref={nameRef}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="botones">
          <button onClick={handleRegister}>Registrarse</button>
          <button onClick={onClose}>Cerrar</button>
        </div>
        <Alert
          color="success"
          isOpen={visible}
          toggle={toggle}
          style={{ position: "fixed", top: 0, right: 0 }}>
          {message}
        </Alert>
      </div>
    </div>
  );
};

const LoginModal = ({ onClose }) => {
  const route = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);
  const [message, setMessage] = useState("");
  const changeMessage = (text) => setMessage(text);

  const handleLogin = async () => {
    if (email === "" || password === "") {
      changeMessage("Ingresa los datos");
      toggle();
      return;
    }
  
    try {
      const response = await fetch(`https://api-aboweb-yenter.onrender.com/usuario/login/${email}/${password}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const responseData = await response.json();
  
      if (responseData.resultado === false) {
        changeMessage("El usuario no existe");
        toggle();
      } else {
        const token = JSON.stringify(responseData.resultado);
        localStorage.setItem("authToken", token);
  
        socket.emit('usuario_conectado', {
          userId: responseData.resultado._id,
        });
  
        if (responseData.resultado.tipoUsuario === "admin") {
          route.push("/pages/admin/contactos");
        } else {
          route.push("/pages/cliente/menu");
        }
      }
    } catch (error) {
      console.log(error);
      changeMessage("Error al iniciar sesión " + error.message);
      toggle();
    }
  };
  

  if (showRegister) {
    return (
      <RegisterModal
        onClose={() => {
          setShowRegister(false);
          onClose();
        }}
      />
    );
  }

  return (
    <div className="login-modal-sesion">
      <div className="login-content">
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="botones">
          <button onClick={handleLogin}>Entrar</button>
          <button onClick={onClose}>Cerrar</button>
        </div>
        <p>
          ¿No tienes cuenta?{" "}
          <span className="register-link" onClick={() => setShowRegister(true)}>
            Regístrate
          </span>
        </p>
        {/* Usar el componente Alert dentro del JSX, pasándole las propiedades que quieras */}
        <Alert color="danger" isOpen={visible} toggle={toggle}>
          {message}
        </Alert>
      </div>
    </div>
  );
};

export default LoginModal;
