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

router.get('/registro', usuarioController.register);

router.get('/login', usuarioController.login);

module.exports = router;