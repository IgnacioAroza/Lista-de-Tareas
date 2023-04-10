const form = document.querySelector('form');
const tituloInput = document.getElementById('titulo');
const descripcionInput = document.getElementById('descripcion');
const listaTareas = document.getElementById('tareas');

let tareas = [];

function agregarTarea(e){
    e.preventDefault();

    const titulo = tituloInput.value.trim();
    const descripcion = descripcionInput.value.trim();
    if(titulo === '' || descripcion === ''){
        return;
    }

    const tarea = {
        titulo : titulo,
        descripcion : descripcion,
        estado : 'Pendiente'
    }

    tareas.push(tarea);
    guardarTareas();
    mostrarTareas();
    form.reset;
};

function mostrarTareas() {
    listaTareas.innerHTML= '';
    tareas.forEach((tarea, index) => {
        const li = document.createElement('li');
        li.innerHTML= `<span>${tarea.titulo}</span>
        <p>${tarea.descripcion}</p>
        <select data-id="${index}">
        <option value="pendiente"${tarea.estado === 'pendiente' ? ' selected' : ''}>Pendiente</option>
        <option value="enproceso"${tarea.estado === 'enproceso' ? ' selected' : ''}>En proceso</option>
        <option value="hecho"${tarea.estado === 'hecho' ? ' selected' : ''}>Hecho</option>
        </select>
        <button data-id="${index}" class="eliminar">Eliminar</button>
        `;
        li.classList.add(tarea.estado);
        listaTareas.appendChild(li);
    });
}

function cambiarEstado(e){
    const select = e.target;
    const id = select.dataset.id;
    const estado = select.value;
    tareas[id].estado = estado;
    guardarTareas();
    mostrarTareas();
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
}

function cargarTareas() {
    const tareasGuardadas = localStorage.getItem('tareas');
    if(tareasGuardadas !== null){
        tareas = JSON.parse(tareasGuardadas);
    }
    mostrarTareas();
}

form.addEventListener('submit', agregarTarea);
listaTareas.addEventListener('change', cambiarEstado);
listaTareas.addEventListener('click', elimiarTarea);
cargarTareas();