const express = require ('express');
const router = express.Router();
const multer = require('multer');
const {check} = require('express-validator');

//--- Require de la base de datos ---//
const db=require('../db/models')

//--Controller--//
const mainController = require('../controller/mainController');


//--Middleware--//
const userLogged=require('../middlewares/userLogged')

//--Rutas--//
router.get('/', mainController.index);

router.get('/carrito', mainController.productCar);

router.post('/carrito', mainController.productCar);





module.exports = router;