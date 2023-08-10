const trabajo = require("../models/models");
const ctrl = {};

ctrl.renderLista = (req, res) => {
  res.render("listado");
};

ctrl.renderFormNueva = (req, res) => {
  res.render("nueva");
};

ctrl.renderFormEditar = (req, res) => {
  const { id } = req.params;
  res.render("editar", { id });
};

ctrl.obtener = async (req, res) => {
  try {
    const trabajo = await trabajo.findAll({
      where: {
        estado: true,
      },
    });

    return res.json(trabajo);
  } catch (error) {
    console.log("Error al obtener", error);
    return res.status(500).json({
      message: "Error al obtener",
    });
  }
};

// Obtener los datos a través de la Primary Key (Pk)
ctrl.obtener = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajo = await trabajo.findByPk(id);
    return res.json(trabajo);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al obtener",
    });
  }
};

// Crear
ctrl.crear = async (req, res) => {
  const { img } = req.body;

  try {
    // Se crea una nueva instancia
    const nueva = new trabajo({
      img,
    });

    // Se guarda en la BD
    await nueva.save();

    return res.status(201).json({ message: "creada con éxito" });
  } catch (error) {
    console.log("Error al crear", error);
    return res.status(500).json({ message: "Error al crear" });
  }
};

// Actualizar
ctrl.actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const trabajo = await trabajo.findByPk(id);
    await trabajo.update(req.body);
    return res.json({
      message: "actualizado exitosamente",
    });
  } catch (error) {
    console.log("Error al actualizar", error);
    return res.status(500).json({
      message: "Error al actualizar",
    });
  }
};

// Eliminar de forma lógica
ctrl.eliminar = async (req, res) => {
  const { id } = req.params;
  try {
    const trabajo = await trabajo.findByPk(id);
    await trabajo.update({ estado: false });
    return res.json({ message: "se eliminó correctamente" });
  } catch (error) {
    console.log("Error al eliminar", error);
    return res.status(500).json({
      message: "Error al eliminar",
    });
  }
};

module.exports = ctrl;
