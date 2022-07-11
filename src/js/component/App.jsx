import React from "react";
import '../../styles/App.css';
import Header from './Header.jsx';
import Task from "./Task.jsx";
import { useState } from 'react';
import Input from './Input.jsx';


const App = () => {

const [tareas, setTareas] = useState([]);

const agregarTarea = tarea => {
    /*
    1.- verificamos que la tarea noe sté en blacno (vacía)
    2.- eliminamos espacios en blanco
    3.- añadimos la tarea al principio del array
    4.- actualziamos el valor de tareas con setareas gracias a la const intermedia que utilizamos (tareasActualizadas)
    */

    if (tarea.texto.trim()) {
      tarea.texto = tarea.texto.trim(); //trim()elimina los espacios en blanco al principio y al final de una cadena de caracteres
      
      const tareasActualizadas = [tarea, ...tareas]; // hacemos que la tarea recién introducida se muestre al principio, es decir, arriba del todo
      setTareas(tareasActualizadas);
    }
    console.log(tareas)
};

//Función que conmuta el estado de una tarea buscando por id
//devuelve array actualizado
const completarTarea = id => {
  const tareasActualizadas = tareas.map(tarea => {
    if (tarea.id === id) {
      tarea.completada = !tarea.completada;
    }
    return tarea;
    })
  setTareas(tareasActualizadas);
  
  };

//Función para eliminar tarea por id
//Devuelve array actualizado
const eliminarTarea = id => {
  const tareasActualizadas = tareas.filter(tarea => 
  tarea.id !== id);
  setTareas(tareasActualizadas);
  };


  return (
		<div>
			<Header nombreApp="TO DO"/>
      <Input onSubmit={agregarTarea}/>
      <div className="main-container">
        
        {
          tareas.map((tarea) => 
            <Task
              key={tarea.id}
              id={tarea.id}
              texto={tarea.texto}
              completada={tarea.completada}
              eliminarTarea = {eliminarTarea}
              completarTarea={completarTarea}
          />)
        }       
      </div>
    </div>
	);
};

export default App;
