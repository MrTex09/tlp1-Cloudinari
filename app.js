const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
port = 3000 || port.process.env.PORT;
require("dotenv").config();
const fileUpload = require("express-fileupload");
// Configurar el middleware
app.use(fileUpload());

require("ejs");
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.set("view engine", "ejs");

// Configura el middleware de express-fileupload
app.use(
  fileUpload({
    createParentPath: true, // Crea automáticamente carpetas si no existen
    limits: { fileSize: 5 * 1024 * 1024 }, // Límite de tamaño de archivo (5MB en este caso)
    useTempFiles: true, // Usa archivos temporales durante la carga
    tempFileDir: "../uploads", // Ruta a la carpeta temporal (puede ser una ubicación personalizada)
  })
);

app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No se encontraron archivos para cargar.");
  }

  const sampleFile = req.files.sampleFile; // 'sampleFile' es el nombre del campo en el formulario

  // Cambia la ruta a tu ubicación deseada para almacenar archivos
  const uploadPath = "../uploads" + sampleFile.name;

  sampleFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    res.send("Archivo cargado correctamente.");
  });
});

app.use(require("./src/routes/img.routes"));
app.listen(port, () => console.log("Server on port", port));
