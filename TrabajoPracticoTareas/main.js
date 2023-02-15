let tareas = [
  {
    Titulo: "Aprender Js",
    Estado: "Pendiente",
  },
  {
    Titulo: "Aprender css",
    Estado: "Pendiente",
  },
  {
    Titulo: "Aprender react",
    Estado: "Terminado",
  },
  {
    Titulo: "Aprender Git",
    Estado: "Terminado",
  },
  {
    Titulo: "Aprender Vscode",
    Estado: "En Proceso",
  },
  {
    Titulo: "Aprender HTML",
    Estado: "En Proceso",
  },
];

function $(elementoDeHtml) {
  return document.querySelector(elementoDeHtml);
}

const $sol = $("#sol");
const $luna = $("#luna");
const $principal = $("#principal");
const $cuerpoTabla = $("#cuerpoTabla");
const $btnPendiente = $("#btnPendiente");
const $btnProceso = $("#btnProceso");
const $btnTerminado = $("#btnTerminado");
const $btnTodos = $("#btnTodos");
const $btnCrear = $("#btnCrear");
const $btnGuardar = $("#btnGuardar");
const $tituloTarea = $("#tituloTarea");
const $estadoTarea = $("#estadoTarea");
const $tituloTareaAntigua = $("#tituloTareaAntigua");
const $tituloTareaNueva = $("#tituloTareaNueva");
const $btnEditar = $("#btnEditar");
const $estadoTareaNueva = $("#estadoTareaNueva");

$luna.addEventListener("click", () => {
  $sol.classList.remove("oculto");
  $luna.classList.add("oculto");
  $principal.classList.add("oscuro");
});

$sol.addEventListener("click", () => {
  $luna.classList.remove("oculto");
  $sol.classList.add("oculto");
  $principal.classList.remove("oscuro");
});

function llenarTabla(elementos) {
  $cuerpoTabla.innerHTML = "";
  elementos.forEach((tarea) => {
    $cuerpoTabla.innerHTML += `<tr>
            <td>${tarea.Titulo}</td>
            <td>${tarea.Estado}</td>
            <td><i class="fa-solid fa-edit editar" onClick="editar(this.id)" id="${tarea.Titulo}"></i></td>
            <td><i class="fa-solid fa-trash basurero" onClick="eliminar(this.id)" id="${tarea.Titulo}"></i></td>
          </tr>`;
  });
}

function editar(id) {
  const tarea = tareas.find((tarea) => {
    return tarea.Titulo === id;
  });
  $tituloTareaAntigua.value = tarea.Titulo;
  $tituloTareaNueva.value = tarea.Titulo;
  $estadoTareaNueva.value = tarea.Estado;
  modalEditar.style.display = "block";
}

$btnEditar.addEventListener("click", () => {
  const tareasEditadas = tareas.map((tarea) => {
    if (tarea.Titulo === $tituloTareaAntigua.value) {
      tarea.Titulo = $tituloTareaNueva.value;
      tarea.Estado = $estadoTareaNueva.value;
    }
    return tarea;
  });
  llenarTabla(tareasEditadas);
  tareas = tareasEditadas;
  modalEditar.style.display = "none";
});

function eliminar(id) {
  const tareasFiltradas = tareas.filter((tarea) => {
    return tarea.Titulo !== id;
  });
  llenarTabla(tareasFiltradas);
  tareas = tareasFiltradas;
}

$btnPendiente.addEventListener("click", () => {
  const tareasPendientes = tareas.filter((tarea) => {
    return tarea.Estado === "Pendiente";
  });
  llenarTabla(tareasPendientes);
});

$btnProceso.addEventListener("click", () => {
  const tareasProceso = tareas.filter((tarea) => {
    return tarea.Estado === "En Proceso";
  });
  llenarTabla(tareasProceso);
});

$btnTerminado.addEventListener("click", () => {
  const tareasTerminadas = tareas.filter((tarea) => {
    return tarea.Estado === "Terminado";
  });
  llenarTabla(tareasTerminadas);
});

$btnTodos.addEventListener("click", () => {
  llenarTabla(tareas);
});

$btnGuardar.addEventListener("click", () => {
  if ($tituloTarea.value === "") {
    alert("El titulo no puede estar vacio");
    return;
  }
  if (/^[a-zA-Z ]+$/.test($tituloTarea.value)) {
    const nuevaTarea = {
      Titulo: $tituloTarea.value,
      Estado: $estadoTarea.value,
    };

    tareas.push(nuevaTarea);
    llenarTabla(tareas);
    modal.style.display = "none";
  } else {
    alert("No se aceptan numeros!");
  }
});

window.addEventListener("load", () => {
  llenarTabla(tareas);
});

// MODAL

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btnCrear.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Modal editar

// Get the modal
let modalEditar = document.getElementById("modalEditar");

// Get the button that opens the modal
let btnModalEditar = document.getElementById("btnModalEditar");

// Get the <span> element that closes the modal
let spanEdit = document.getElementsByClassName("closeEdit")[0];

// When the user clicks on <span> (x), close the modal
spanEdit.onclick = function () {
  modalEditar.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modalEditar.style.display = "none";
  }
};
