import React, { useState } from "react";
import '../../styles/Input.css';
import { v4 as uuidV4 } from 'uuid';


function Input (props) {

  const [input, setInput] = useState('');

  const manejarCambio = e => {
    setInput(e.target.value);
  };

  const manejarEnvio = e => {
    e.preventDefault();

    const tareaNueva ={
      id: uuidV4(),
      texto: input,
      completada: false
    }

    props.onSubmit(tareaNueva);// este es el enlace de la tarea q pasamos como prop a la función agregarTarea, que se lanza al hacer submit

  }


  return(
    <form className="input-container" onSubmit={manejarEnvio}>
      <input 
        type="text"
        className="input"
        placeholder="Introduce tarea..."
        onChange={manejarCambio}
      />

      <button className="tarea-boton">
        Agregar Tarea
      </button>

    </form>
  );
}

export default Input; 