export { crearBaseDeDatos };
export { actualizarBaseDeDatos };
//export { leerBaseDeDatos };
import { v4 as uuidV4 } from 'uuid';


//FUNCIÓN CREAR BBDD

function crearBaseDeDatos (usuario) {

    console.log(usuario)

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
                return res.json();
            }
            else{
                console.log(`Usuario ya creado: ${res.status}`)
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

//console.log(tareasBBDD);


let url = 'https://assets.breatheco.de/apis/fake/todos/user/sergiocentenera';
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
            crearBaseDeDatos(usuario);
        }        
    })
    .then( (todo) => {
        
         console.log(todo);
         let tareasLeidas = todo.map(t =>{
            return(
              {
              'id': uuidV4(),
              'texto': t.label,
              'completada': false
              })
         })
         console.log(tareasLeidas)
         
     // retornamos las tareas debidamente formateadas
      return tareasLeidas;
      }
    )
    .catch(error => console.error('Error: ', error)); 
    
}