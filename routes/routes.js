const { Router } = require("express");
const router = Router();

const {
  renderLista,
  renderFormNueva,
  renderFormEditar,
  obtenert, // Obtener todas
  obtenerr, // Obtener un única
  crear,
  actualizar,
  eliminar,
} = require("../controller/controller.js");

router.get("/", renderLista);

/// Formulario para crear
router.get("/crear", renderFormNueva);

// ==========================================
//         Rutas para CRUD de trabajo
// ==========================================

// Obtener todas las trabajo
router.get("/api", obtenert);

// Crear
router.post("/api", crear);

router.get("/api/:id", obtener);

// Actualizar
router.put("/api/:id", actualizar);

// Eliminar  de forma lógica
router.delete("/api/:id", eliminar);

// Formulario para actualizar
router.get("/actualizar/:id", renderFormEditar); // para capturar :id -> req.params.id

module.exports = router;
