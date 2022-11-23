const express = require ('express');
const { controller }  = require('../controller/productoController');
const router = express.Router();
const {check} = require('express-validator');
const multer = require('multer');


const productoController  = require('../controller/productoController');

const storage = multer.diskStorage({
    destination:    function (req, file, cb) {
        cb(null, './public/images/productos')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadFile = multer({storage});

router.get('/', productoController.controller.productDetail);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/', uploadFile.single('photo'), mainController.controller.productDetail);

module.exports=router