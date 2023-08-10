const obtenerDatos = async () => {
  // Pedir las trabajo al servidor
  const data = await fetch("http://localhost:4002/api", {
    method: "GET",
  });
  const trabajo = await data.json();
  return trabajo;
};

const mostrartrabajo = (trabajo, tablaElement) => {
  let registros = "";
  trabajo.forEach((trabajo) => {
    registros += `
        <tr>
            <td>${trabajo.codigo}</td>
            <td>${trabajo.nombre}</td>
            <td>${trabajo.apellido}</td>
            <td>${trabajo.img}</td>
            <td>
           <div class="row">
           <a href="/actualizartrabajo/${trabajo.id}" class="btn btn-sm btn-warning">Editar</a>
           <button class="btn btn-danger btn-sm" data-id="${trabajo.id}" onClick=eliminartrabajo(event)>Eliminar</button>
           </div>
            </td>
        </tr>
    `;
  });

  tablaElement.innerHTML = registros;
};

const eliminartrabajo = async (e) => {
  console.log(e);
  const id = e.target.dataset.id;

  const response = await fetch(`/api/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  alert(data.message);

  window.location.href = "/";
};

document.addEventListener("DOMContentLoaded", async () => {
  // Mostrar las trabajo en la tabla
  const tbody = document.querySelector("#listadotrabajo");
  const trabajo = await obtenerDatos(); // undefined si no obtenerDatos no retorna nada
  mostrartrabajo(trabajo, tbody);
});
