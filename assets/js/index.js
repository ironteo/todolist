const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');

let listaTareas = [];

//Funcion que captura el evento submit y dispara la tarea crearTarea y la funcion escribirHtml
//Al momento de crear hacer click en crear tarea, disparar la funcion que crea la tarea.

crearTodo();
function crearTodo() {

    //Al momento de crear hacer click en crear tarea, disparar la funcion que crea la tarea.
    formulario.addEventListener('submit', crearTarea);

    //Cuando el documento este listo, buscar en el localStorage las tareas ya creadas
    document.addEventListener('DOMContentLoaded', () => {
        //Al arreglo vacio se pasa desde localstorage la lista de tareas guardada
        listaTareas = JSON.parse(localStorage.getItem('Tareas')) || [];

        //SE ejecuta la funcion que escribe el html
        escribirHtml();
    })


}

function error() {
    const nombreTarea = document.getElementById('ingresoTarea');
    nombreTarea.classList.add('campoObligatorio');

    const mensajeError = document.createElement('p');
    mensajeError.textContent = 'Este campo es obligatorio';
    mensajeError.classList.add('font-weight-bold')
    formulario.appendChild(mensajeError)
    setTimeout(() => {
        nombreTarea.classList.remove('campoObligatorio');
        mensajeError.remove();
    }, 5000);
}

//Funcion que crea la tarea, y previene se envie la info del formulario.
//Ademas esta funcion debe capturar lo que ingresa el user.
//debe validar que el campo ingresado por el usuario no este en blanco
//borrar lo escrito por el formulario una vez creada la tarea.

function crearTarea(e) {
    e.preventDefault();

    //Captura de datos ingresado por usuario

    const nombreTarea = document.getElementById('ingresoTarea').value;

    //Validacion que campo contenga informacion.
    if (nombreTarea === "") {
        error();
        return
    }

    //Tarea con su id y nombre de tarea
    const tarea = {
        id: Date.now(),
        tarea: nombreTarea,
        fechaCreacion: Date(),
        terminada: false,
    }

    //Agregar tarea a la lista de tareas
    listaTareas.push(tarea)

    //Se crea la tarea y despue se muestra en el html
    escribirHtml();

    totalTareas();
    //borrar una vez ingresada tarea
    formulario.reset();
}


//Funcion para guardar los datos en el local storage la lista de tareas
function datosLocalStorage() {
    localStorage.setItem('Tareas', JSON.stringify(listaTareas))
}

function escribirHtml() {

    limpiarHtml();

    if (listaTareas.length > 0) {
        listaTareas.forEach((tarea) => {
            resultado.innerHTML += `
            <div class="row row-cols-1 row-cols-md-1">
                <div class="col mb-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${tarea.tarea}</h5>
                            <button type="button" class="btn btn-success">v</button>
                            <a href="#" class="btn btn-danger" onclick=eliminarTarea("${tarea.id}")>X</a>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">${tarea.fechaCreacion}</small>
                        </div>
                    </div> 
                </div>
            </div>
            `;
        })
    }

    datosLocalStorage();
}


const eliminarTarea = (idTarea) => {
    const elimnar = parseInt(idTarea);
    for (let i = 0; i < listaTareas.length; i++) {
        if (elimnar === listaTareas[i].id) {
            listaTareas.splice([i], 1)
            console.log(listaTareas);
            datosLocalStorage();
            escribirHtml();
            totalTareas();
        }
    }
}

//Esta funcion borra el primer hijo de en donde se escribe el resultado.
function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
        datosLocalStorage();
    }
}

const totalTareas = () => {
    const total = document.getElementById('totalTareas');
    const pendientes = document.getElementById('tareasPendientes');
    const completas = document.getElementById('tareasCompletadas');

    total.innerHTML = `
        ${listaTareas.length}
    `;

    console.log(listaTareas);
    for (let i = 0; i < listaTareas.length; i++) {

        if (listaTareas[i].terminada === false) {
            pendientes.innerHTML = `
             ${i + 1}
        `;
        }

    }

}


