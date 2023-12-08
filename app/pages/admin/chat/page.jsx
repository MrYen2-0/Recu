"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "../../../styles/admin/chat.css";
import axios from "axios";

const socket = io("https://api-aboweb-yenter.onrender.com/");

function Chat() {
  const requerirInformacionChat = async (chatMateId) => {
    await axios
      .get(`https://api-aboweb-yenter.onrender.com/usuario/requerirInfo/${chatMateId}`)
      .then((response) => {
        console.log(response);
        setChatMateInfo({
          nombre: response.data.resultado.nombre,
          email: response.data.resultado.email,
          mostrar: true
        });
      })
      .catch((error) => {
        alert("error" + error.message);
      });
  };

  const [usuario,setUsuario] = useState({});

  if (!usuario) {
    window.location.href = "/";
  }

  const [mensaje, setMensaje] = useState("");
  const [chat, setChat] = useState([{ mensaje: "", remitente: "" }]);
  const [chatMateInfo, setChatMateInfo] = useState({});
  const [infoBool, setInfoBool] = useState(false);
  const [chatMateId,setChatMateId] = useState('');

  useEffect(() => {
    JSON.parse(localStorage.getItem("authToken"));
    socket.on("confirmar_chat", (data) => {
      console.log(data);
      setChatMateId(data);
    });

    socket.on("enviar_mensaje", (data) => {
      setChat((prevMessages) => [
        ...prevMessages,
        { remitente: "otro", mensaje: data.mensaje },
      ]);
    });

    requerirInformacionChat(chatMateId);

    return () => {
      socket.off("connect", () => setIsConnected(false));
      socket.off("enviar_mensaje");
      socket.off("confirmar_chat");
      localStorage.removeItem("_id");
    };
  },[chatMateId]);

  const handleEnter = (e) => {
    if (e.key === "Enter" && mensaje.trim() !== "") {
      e.preventDefault();
      if (e.keyCtrl) {
        setMensaje((mensaje) => mensaje + "\n");
      } else {
        socket.emit("enviar_mensaje", {
          mensaje,
          idUsuarioReceptor: usuario._id,
          remitente: usuario.nombre
        });
        setMensaje("");
      }
    }
  };

  return (
    <div>
      <header className="their-container">
        <div>
          <p className="their-name">
            {chatMateInfo.nombre}
          </p>
          <p className="their-userType">
            {chatMateInfo.email}
          </p>
        </div>
      </header>
      <main>
        {chat.map((mensaje, index) => (
          <div
            key={index}
            className={mensaje.remitente === "yo" ? "miMensaje" : "suMensaje"}
          >
            {mensaje.mensaje}
          </div>
        ))}
      </main>
      <footer>
        <textarea
          className="mensaje-container"
          placeholder="escribe tu mensaje"
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={handleEnter}
          value={mensaje}
        ></textarea>
      </footer>
    </div>
  );
}

export default Chat;
