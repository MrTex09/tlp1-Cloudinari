const formCrear = document.querySelector("#formNueva");

formCrear.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const fecha_ingreso = document.querySelector("#img").value;

  const trabajo = {
    nombre,
    apellido,
    img,
  };

  const response = await fetch("/api", {
    method: "POST",
    body: JSON.stringify(trabajo),
    headers: {
      "Content-Type": "application/json", // Cuando se envían datos JSON al servidor
    },
  });

  const data = await response.json();

  alert(data.message);
  window.location.href = "/";
});
