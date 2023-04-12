// Definir un arreglo para almacenar las tareas
let tareas = [];

// Obtener el formulario de crear tarea y la lista de tareas
const formCrearTarea = document.querySelector('form');
const listaTareas = document.querySelector('#tareas');

// Obtener las tareas guardadas en localStorage, si existen
if (localStorage.getItem('tareas')) {
    tareas = JSON.parse(localStorage.getItem('tareas'));
    actualizarListaTareas();
}

// Agregar evento al formulario para crear tarea
formCrearTarea.addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const titulo = this.titulo.value.trim();
    const descripcion = this.descripcion.value.trim();
    const estado = this.estado.value.trim();

    // Validar que se haya ingresado un título
    if (titulo === '') {
        alert('Debe ingresar un título para la tarea');
        return;
    }

    // Agregar la tarea al arreglo de tareas
    const tarea = {
        id: Date.now(),
        titulo: titulo,
        descripcion: descripcion,
        estado: estado
    };
    tareas.push(tarea);

    // Guardar las tareas en localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));

    // Limpiar el formulario y actualizar la lista de tareas
    this.reset();
    actualizarListaTareas();
});

// Función para actualizar la lista de tareas en el HTML
function actualizarListaTareas() {
    // Limpiar la lista de tareas
    listaTareas.innerHTML = '';

    // Recorrer el arreglo de tareas y agregar cada una a la lista
    tareas.forEach(function(tarea) {
        const li = document.createElement('li');

        // Agregar el título de la tarea
        const spanTitulo = document.createElement('span');
        spanTitulo.textContent = tarea.titulo;
        li.appendChild(spanTitulo);

        // Agregar el botón de editar tarea
        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.addEventListener('click', function() {
            editarTarea(tarea);
        });
        li.appendChild(botonEditar);

        // Agregar el botón de eliminar tarea
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.addEventListener('click', function() {
            eliminarTarea(tarea.id);
        });
        li.appendChild(botonEliminar);

        // Agregar la clase correspondiente según el estado de la tarea
        if (tarea.estado === 'pendiente') {
            li.classList.add('pendiente');
        } else if (tarea.estado === 'proceso') {
            li.classList.add('proceso');
        } else if (tarea.estado === 'hecho') {
            li.classList.add('hecho');
        }

        // Agregar la tarea a la lista
        listaTareas.appendChild(li);
    });
}

// Función para editar una tarea
function editarTarea(tarea) {
    // Pedir al usuario que ingrese los nuevos valores para la tarea
    const nuevoTitulo = prompt('Ingrese el nuevo título de la tarea:', tarea.titulo);
    const nuevoDescripcion = prompt('Ingrese la nueva descripción de la tarea:', tarea.descripcion);
    const nuevoEstado = prompt('Ingrese el nuevo estado de la tarea (pendiente, proceso, hecho):', tarea.estado);

    // Actualizar la tarea en el arreglo de tareas
    tarea.titulo = nuevoTitulo;
    tarea.descripcion = nuevoDescripcion;
    tarea.estado = nuevoEstado;

    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));

    // Actualizar la lista de tareas en el HTML
    actualizarListaTareas();
}

// Función para eliminar una tarea
function eliminarTarea(id) {
    // Filtrar las tareas para eliminar la tarea con el ID especificado
    tareas = tareas.filter(function(tarea) {
        return tarea.id !== id;
    });

    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));

    // Actualizar la lista de tareas en el HTML
    actualizarListaTareas();
}

// Función para cambiar el estado de una tarea
function cambiarEstadoTarea(id, estado) {
    // Buscar la tarea con el ID especificado
    const tarea = tareas.find(function(tarea) {
        return tarea.id === id;
    });

    // Actualizar el estado de la tarea
    tarea.estado = estado;

    // Guardar las tareas actualizadas en localStorage
    localStorage.setItem('tareas', JSON.stringify(tareas));

    // Actualizar la lista de tareas en el HTML
    actualizarListaTareas();
}

// Obtener los botones de cambiar estado de las tareas
const botonesCambiarEstado = document.querySelectorAll('.cambiar-estado');

// Agregar evento a cada botón para cambiar el estado de la tarea correspondiente
botonesCambiarEstado.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const id = this.dataset.id;
        const estado = this.dataset.estado;
        cambiarEstadoTarea(id, estado);
    });
});