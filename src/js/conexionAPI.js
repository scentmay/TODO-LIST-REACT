export {crearBaseDeDatos};
export {actualizarBaseDeDatos};

//FUNCIÓN CREAR BBDD

function crearBaseDeDatos () {

    let url = 'https://assets.breatheco.de/apis/fake/todos/user/sergiocentenera';
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
                console.log('El request se hizo bien');
                return res.json();
            }
            else{
                console.log(`Hubo un error: ${res.status}`)
            }
        })
        .catch(error => console.error('Error: ', error)); 
}


//FUNCIÓN ACTUALIZAR BBDD

function actualizarBaseDeDatos(tareas){

console.log(tareas);

// con esta parte de código hacemos que los datos sean tal como se nos pide en la API
const tareasBBDD = tareas.map( (todo) => {
    return(
        {
            'label': todo.texto,
            'done': false
        }
    )
});

console.log(tareasBBDD);


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

//FUNCIÓN PARA RECUPERAR TAREAS DE LA BBDD

