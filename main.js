const form = document.querySelector('form');
const tituloInput = document.getElementById('titulo');
const descripcionInput = document.getElementById('descripcion');
const listaTareas = document.getElementById('tareas');

const estado = "Pendiente";

listaTareas.addEventListener("mouseup", function(event) {
    const tareaId = event.target.getAttribute("data-id");
    cambiarTarea(tareaId);
});

let tareas = [];

function agregarTarea(e){
    e.preventDefault();

    const titulo = tituloInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    if(titulo === '' || descripcion === ''){
        return;
    }

    const tarea = {
        titulo,
        descripcion,
        estado
    }

    tareas.push(tarea);
    guardarTareas();
    mostrarTareas();
    form.reset;
    // console.log(tareas);
};

function mostrarTareas() {
    // console.log('Mostrando tareas...')
    listaTareas.innerHTML= '';
    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML= `
        <span>${tarea.titulo}</span>
        <p>${tarea.descripcion}</p>
        <select data-id="${index}">
        <option value="pendiente"${tarea.estado === 'pendiente' ? ' selected' : ''}>Pendiente</option>
        <option value="enproceso"${tarea.estado === 'enproceso' ? ' selected' : ''}>En proceso</option>
        <option value="hecho"${tarea.estado === 'hecho' ? ' selected' : ''}>Hecho</option>
        </select>
        <button data-id="${index}" class="editar">Editar</button>
        <button data-id="${index}" class="eliminar">Eliminar</button>
        `;
        li.classList.add(tarea.estado.toLowerCase());
        listaTareas.appendChild(li);
    
    });
}

function agregarTareas(tareas, estado) {
    if (tareas.length > 0) {
    const estadoDiv = document.createElement('div');
    estadoDiv.className = 'estado';
    const estadoTitulo = document.createElement('h2');
    estadoTitulo.textContent = estado;
    estadoDiv.appendChild(estadoTitulo);
    tareas.forEach(function(tarea, index) {
        const tareaDiv = document.createElement('div');
        tareaDiv.className = 'tarea';
        const tareaTitulo = document.createElement('h3');
        tareaTitulo.textContent = tarea.titulo;
        const tareaDescripcion = document.createElement('p');
        tareaDescripcion.textContent = tarea.descripcion;
        const tareaEstado = document.createElement('select');
        tareaEstado.innerHTML = `
        <option value="pendiente" ${tarea.estado === 'pendiente' ? 'selected' : ''}>Pendiente</option>
        <option value="en-proceso" ${tarea.estado === 'en-proceso' ? 'selected' : ''}>En proceso</option>
        <option value="hecho" ${tarea.estado === 'hecho' ? 'selected' : ''}>Hecho</option>
        `;
        const tareaEditar = document.createElement('button');
        tareaEditar.textContent = 'Editar';
        tareaEditar.dataset.id = tareas.indexOf(tarea);
        tareaEditar.className = 'editar';
        tareaEditar.addEventListener('click', editarTareas);
        const tareaEliminar = document.createElement('button');
        tareaEliminar.textContent = 'Eliminar';
        tareaEliminar.dataset.id = tareas.indexOf(tarea);
        tareaEliminar.className = 'eliminar';
        tareaEliminar.addEventListener('click', elimiarTarea);
        tareaDiv.appendChild(tareaTitulo);
        tareaDiv.appendChild(tareaDescripcion);
        tareaDiv.appendChild(tareaEstado);
        tareaDiv.appendChild(tareaEditar);
        tareaDiv.appendChild(tareaEliminar);
        estadoDiv.appendChild(tareaDiv);
    });
    listaTareas.appendChild(estadoDiv);
    }
}

function cambiarTarea(id) {
    let tarea = document.getElementById(id);
    if (tarea) {
    tarea.estado = !tarea.estado;
    actualizarTarea(tarea);
    } else {
    // console.error("La tarea con ID " + id + " no se encontró.");
    }
}

function editarTareas(e) {
    if(e.target.classList.contains('editar')) {
        const id = e.target.dataset.id;
        const tarea = tareas[id];
        tituloInput.value = tarea.titulo;
        descripcionInput.value = tarea.descripcion;
        form.removeEventListener('submit', agregarTarea);
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            tarea.titulo = tituloInput.value.trim();
            tarea.descripcion = descripcionInput.value.trim();
            guardarTareas();
            mostrarTareas();
            form.reset();
        });
    }
}

function elimiarTarea(e) {
    if(e.target.classList.contains('eliminar')) {
        const id = e.target.dataset.id;
        tareas.splice(id, 1);
        guardarTareas();
        mostrarTareas();
    }
}

function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
    // console.log(localStorage.getItem('tareas'));
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if(tareasGuardadas !== null){
        tareas = JSON.parse(tareasGuardadas);
    }
    mostrarTareas();
}

function crearSelect(opciones, valorSeleccionado, funcionCambio) {
    const select = document.createElement('select');
    select.addEventListener('change', funcionCambio);

    for (const opcion of opciones) {
    const option = document.createElement('option');
    option.text = opcion;
    option.value = opcion;
    if (opcion === valorSeleccionado) {
        option.selected = true;
    }
    select.appendChild(option);
    }

    return select;
}


form.addEventListener('submit', agregarTarea);
listaTareas.addEventListener('change', cambiarTarea);
listaTareas.addEventListener('click', editarTareas)
listaTareas.addEventListener('click', elimiarTarea);
cargarTareas();