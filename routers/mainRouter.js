const express = require ('express');
const { controller }  = require('../controller/mainController');
const router = express.Router();
const multer = require('multer');
const {check} = require('express-validator');



const mainController = require('../controller/mainController');

router.get('/', mainController.index);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/', uploadFile.single('photo'), mainController.controller.index);



router.get('/carrito', mainController.productCar);

router.post('/carrito', mainController.productCar);



module.exports = router;