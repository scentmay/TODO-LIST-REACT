import React, { useRef } from "react";
import '../../styles/App.css';
import Header from './Header.jsx';
import Task from "./Task.jsx";
import { useState } from 'react';
import Input from './Input.jsx';
import { v4 as uuidV4 } from 'uuid';

const App = () => {

const [tareas, setTareas] = useState([]);

const [currentUser, setCurrentUser] = useState("");

//FUNCIONES DE MANEJO DE LA API--------------------------------------------- 


//FUNCIÓN CREAR BBDD

function crearBaseDeDatos (usuario) {

  //console.log(usuario)

  let url = `https://assets.breatheco.de/apis/fake/todos/user/${usuario}`;
  let options = {
      method:'POST',
      body: JSON.stringify(
          [
             
          ]
      ),
      headers:{
          'Content-Type': 'application/json'
      }
  }


  
  fetch(url, options)
      .then(res => {
          console.log (res.status)
          if (res.status >= 200 && res.status <=300) {
              console.log('El usuario se ha creado correctamente');
              setCurrentUser(usuario);
              setTareas([]);
              return res.json();
              
              
          }
          else{
              console.log(`Usuario ya creado: ${res.status}`)
              setCurrentUser(usuario);
              leerBaseDeDatos(usuario);
          }
      })

      .catch(error => console.error('Error: ', error)); 
}


//----------------------------------------------------------------
//----------------------------------------------------------------

//FUNCIÓN ACTUALIZAR BBDD

function actualizarBaseDeDatos(tareas){

//console.log(tareas);

// con esta parte de código hacemos que los datos sean tal como se nos pide en la API
const tareasBBDD = tareas.map( (todo) => {
  return(
      {
          'label': todo.texto,
          'done': todo.completada
      }
  )
});

console.log(tareasBBDD);


let url = `https://assets.breatheco.de/apis/fake/todos/user/${currentUser}`;
let options = {
  method:'PUT',
  body:  JSON.stringify(tareasBBDD),    
  headers:{
      'Content-Type': 'application/json'
  }
}

fetch(url, options)
  .then(res => {
      console.log (res.status)
      if (res.status >= 200 && res.status <=300) {
          console.log('El request se hizo bien');
          return res.json();
      }
      else{
          console.log(`Hubo un error: ${res.status}`)
      }
  })
  .catch(error => console.error('Error: ', error)); 
}


//----------------------------------------------------------------
//----------------------------------------------------------------

//FUNCIÓN PARA RECUPERAR TAREAS DE LA BBDD

function leerBaseDeDatos(usuario){

  let url = `https://assets.breatheco.de/apis/fake/todos/user/${usuario}`;
  let options = {
  method:'GET',
  body:  JSON.stringify(),    
  headers:{
      'Content-Type': 'application/json'
      }
  }
  return fetch(url, options)
  .then(res => {
      console.log (res.status)
      if (res.status >= 200 && res.status <=300) {
          console.log('El request se hizo bien');
          return res.json();
      }
      else if(res.status === 404){
          //crearBaseDeDatos(usuario);
          console.log('Usuario no existe');
      }        
  })
  .then( (todo) => {
      
      // console.log(todo);
       let tareasLeidas = todo.map(t =>{
          return(
            {
            // retornamos las tareas debidamente formateadas
            'id': uuidV4(),
            'texto': t.label,
            'completada': false
            })
       })
       //console.log(tareasLeidas)
       setTareas(tareasLeidas);
    }
  )
  .catch(error => console.error('Error: ', error)); 
  
}

//FUNCIONES DE MANEJO DE LA API--------------------------------------------- 



//----------------------------------------------------------------
//Función para agregar tarea nueva 

const agregarTarea = tarea => {
    /*
    1.- verificamos que la tarea no esté en blanco (vacía)
    2.- eliminamos espacios en blanco
    3.- añadimos la tarea al principio del array
    4.- actualizamos el valor de tareas con setTareas gracias a la const intermedia que utilizamos (tareasActualizadas)
    */

    if (tarea.texto.trim()) { //nos aseguramos que no es cadena vacía
      tarea.texto = tarea.texto.trim(); //trim()elimina los espacios en blanco al principio y al final de una cadena de caracteres
      
      const tareasActualizadas = [tarea, ...tareas]; // hacemos que la tarea recién introducida se muestre al principio, es decir, arriba del todo
      
      setTareas(tareasActualizadas);
      console.log(tareasActualizadas);
      actualizarBaseDeDatos(tareasActualizadas);
    }
};


//----------------------------------------------------------------

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
  actualizarBaseDeDatos(tareasActualizadas);  
  };


//----------------------------------------------------------------

//Función para eliminar tarea por id
//Devuelve array actualizado
const eliminarTarea = id => {
  const tareasActualizadas = tareas.filter(tarea => 
  tarea.id !== id);
  setTareas(tareasActualizadas);
  actualizarBaseDeDatos(tareasActualizadas);
  };

//----------------------------------------------------------------

 
  return (
		<div>
			<Header nombreApp="TO DO"/>
          <h3>Usuario conectado:
              <input type='text' placeholder='Introduzca usuario...' onChange={(e)=>{
              setCurrentUser(e.target.value);
            }}/>
            
            <button onClick={() => {
                crearBaseDeDatos(currentUser);
              }}>Conectar</button>
            <button onClick={() => {
              setTareas([]);
              console.log(tareas);
              actualizarBaseDeDatos(tareas);
              }
            }>Limpiar tareas</button>
          </h3>


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
            />
          )
        }       
      </div>
    </div>
	);
};

export default App;








