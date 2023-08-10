const form = document.querySelector("#formNueva");
const Id = form.dataset.id;

const nombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const img = document.querySelector("#img");

document.addEventListener("DOMContentLoaded", async () => {
  // Traemos lo que se va a editar
  const response = await fetch(`/api/${Id}`);
  const data = await response.json();

  // Mostrar en el formulario los datos que se quiere actualizar
  nombre.value = data.nombre;
  apellido.value = data.apellido;
  fecha_ingreso.value = data.fecha_ingreso;
  fecha_salida.value = data.fecha_salida;
  cantidad_personas.value = data.cantidad_personas;
  telefono.value = data.telefono;
  email.value = data.email;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  Actualizada = {
    nombre: nombre.value,
    apellido: apellido.value,
    img: img.value,
  };

  const response = await fetch(`/api/${Id}`, {
    method: "PUT",
    body: JSON.stringify(Actualizada),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    alert("La base de datos ha sido actualizada"); // Muestra el mensaje en una alerta
    window.location.href = "http://localhost:4002/"; // Redirecciona al usuario a otra página
  } else {
    alert("Error al actualizar la base de datos");
  }
});
