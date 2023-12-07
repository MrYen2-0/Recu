"use client";
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Alert } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { io } from 'socket.io-client';

const socket = io('http://localhost:9000');

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
    var nombre = nameRef.current.value;
    var resultado = validarNombre(nombre);
    if (!resultado) {
      changeMessage("El nombre no es válido");
      toggle();
      return;
    }
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      changeMessage("favor de ingresar todos los datos");
      toggle();
      return;
    }
    if (!(password === confirmPassword)) {
      changeMessage("contraseñas no coinciden");
      toggle();
      return;
    }
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    );
    if (!emailRegex.test(email)) {
      changeMessage("formato de email invalido");
      toggle();
      return;
    }
    let data = {
      nombre: name,
      email: email,
      contrasenia: password,
    };
    await axios
      .post("http://localhost:9000/usuario/registrarse", data)
      .then((response) => {
        changeMessage("Felicidades por registrarte, ahora inicia sesión para continuar.");
        toggle();
      })
      .catch((error) => {
        changeMessage("ha habido un error " + error);
        toggle();
        return;
      });
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
          style={{ position: "fixed", top: 0, right: 0 }}
        >
          {message}
        </Alert>
      </div>
    </div>
  );
};

const LoginModal = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible(!visible);
  const [message, setMessage] = useState("");
  const changeMessage = (text) => setMessage(text);

  const handleLogin = async () => {

    if (email === "" || password === "") {
      changeMessage("ingresa los datos");
      toggle();
      return;
    }
    await axios.get(`http://localhost:9000/usuario/login/${email}/${password}`, {}).then((response) => {
        if (response.data.resultado === false) {
          changeMessage("el usuario no existe");
          toggle();
        } else {
          const token = JSON.stringify(response.data.resultado);
          localStorage.setItem("authToken", token);
          socket.emit('usuario_conectado', { userId: response.data.resultado._id });
          if (response.data.resultado.tipoUsuario === "admin") {
            window.location.href = "http://localhost:3000/pages/admin/contactos";
          } else {
            window.location.href = "http://localhost:3000/pages/cliente/menu";
          }
        }
      })
      .catch((error) => {
        console.log(error);
        changeMessage("error al iniciar sesion " + error);
        toggle();
      });
  };

  if (showRegister) {
    return <RegisterModal onClose={() => {setShowRegister(false); onClose();}} />;
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
