import React, { useState } from "react";
import '../../styles/Task.css';


function Task ({id, texto, completada, completarTarea, eliminarTarea}) {

    const [visible, setVisible] = useState(false);

    const mostrarIcono = () => {
      setVisible(true)
    };
    
    const esconderIcono = () => {
      setVisible(false)
    };


    return(
      <div className="tarea-global" onMouseLeave={() => esconderIcono()}>
        <div className={ completada ? 'task completada' : 'task'}
          onClick={() => completarTarea(id)}
          onMouseEnter={() => mostrarIcono()}
          >
          {texto}
        </div>
        <div className={ visible ? 'tarea-icono-mostrada' : 'tarea-icono-escondida'}>
          <i className="fa-solid fa-circle-xmark" onClick={() => eliminarTarea(id)}></i>
        </div>
      </div>
    );
}

export default Task;