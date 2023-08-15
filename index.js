const express = require("express");
const app = express();
const multer = require("multer");
const mimeTypes = require("mime-Types");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const PORT = 7000;
app;
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "." + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/files", (req, res) => {
  res.render("upload", { error: null, success: null });
});

app.post("/files", upload.single("avatar"), (req, res) => {
  if (!req.file) {
    res.render("upload", {
      error: "Por favor, selecciona un archivo para subir.",
      success: null,
    });
  } else {
    res.render("upload", {
      error: null,
      success: "Archivo subido exitosamente.",
    });
  }
});
// Ruta para la página de inicio

app.get("/nube", (req, res) => {
  res.render("nube", { error: null, success: null });
});

cloudinary.config({
  cloud_name: "diqttuxad",
  api_key: 852866145688219,
  api_secret: "kh9uplQr4aLbXklD7b7Cicoimwc",
});

// Ruta para la subida de archivos
app.post("/nube", upload.single("avatar"), async (req, res) => {
  if (!req.file) {
    res.render("nube", {
      error: "Por favor, selecciona un archivo para subir.",
      success: null,
    });
  } else {
    let error, uploadedFile;
    try {
      uploadedFile = await cloudinary.uploader.upload(
        path.join(__dirname, "./uploads", req.file.filename),
        {
          folder: "upload",
        }
      );
    } catch (err) {
      error = err;
    }

    res.render("nube", {
      error: JSON.stringify(error) || null,
      success:
        !error && "Archivo subido exitosamente. URL: " + uploadedFile.url,
    });
  }
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Ocurrió un error.");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
