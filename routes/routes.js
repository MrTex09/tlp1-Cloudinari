const { Router } = require("express");
const router = Router();

const {
  renderLista,
  renderFormNueva,
  renderFormEditar,
  obtener, // Obtener todas
  obtener, // Obtener un única reserva
  crear,
  actualizar,
  eliminar,
} = require("../controllers/controllers");

router.get("/", renderLista);

/// Formulario para crear una reserva
router.get("/crear", renderFormNueva);

// ==========================================
//         Rutas para CRUD de trabajo
// ==========================================

// Obtener todas las trabajo
router.get("/api", obtener);

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
