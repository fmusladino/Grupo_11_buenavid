const express = require ('express');
const router = express.Router();
const multer = require('multer');
const {check} = require('express-validator');


//Multer
const storage = multer.diskStorage({
    destination:    function (req, file, cb) {
        cb(null, './public/images/usuarios')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadFile = multer({storage});

//Require de Controller
const usuarioController = require('../controller/usuarioController');


//Rutas
router.get('/login', usuarioController.mostrarFormularioLogin);
router.get('/registro', usuarioController.mostrarFormularioRegistroUsuario);
router.get('/modificar/:id', usuarioController.mostrarFormularioModificarUsuario);
router.post('/registro', uploadFile.single('image'), usuarioController.almacenarNuevoUsuario);
router.put('/modificar/:id',uploadFile.single('image'),usuarioController.almacenaUsuarioModificado);
router.delete('/borrar/:id', usuarioController.borrarUsuario);

module.exports = router;