const express = require ('express');
const { controller }  = require('../controller/mainController');
const router = express.Router();


const mainController = require('../controller/mainController');

router.get('/', mainController.controller.index);

router.get('/login', mainController.controller.login);

router.get('/carrito', mainController.controller.productCar);

router.get('/producto', mainController.controller.productDetail);

router.get('/registro', mainController.controller.register);

module.exports = router;