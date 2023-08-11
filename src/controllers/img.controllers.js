const ctrlImg = {};
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.filename + "-" + Date.now());
  },
});

const upload = multer({ storage: storage });

ctrlImg.upload = upload.single("myFile");

ctrlImg.renderImg = (req, res) => {
  res.render("index.ejs");
};

//Subir imagen
ctrlImg.Subirimagen = (req, res) => {
  res.send({ data: "Enviar un archivo" });
};

module.exports = ctrlImg;
