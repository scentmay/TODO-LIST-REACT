import React, { useEffect, useState } from "react";
import '../../styles/Input.css';
import { v4 as uuidV4 } from 'uuid';


function Input (props) {

  const [input, setInput] = useState('');


  function manejarCambio (e) { 
    setInput(e.target.value);
  };

  function manejarEnvio(e) {
    e.preventDefault();

    const tareaNueva ={
      id: uuidV4(),
      texto: input,
      completada: false
    }
    e.target.reset(); // limpiamos el formulario!!
    focus();          // Volvemos a poner el foco en el input
    

    console.log("hola");
    props.onSubmit(tareaNueva);// este es el enlace de la tarea q pasamos como prop a la función agregarTarea, que se lanza al hacer submit
  }

 //--------------------------------------------------
 //COMPONENTE


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