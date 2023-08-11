const { renderImg, renderSubir, Subirimagen } = require('../controllers/img.controllers')
const router = require('express').Router();

router.get('/', renderImg)


//Subir imagen 
router.post('/subir', Subirimagen)


module.exports = router;