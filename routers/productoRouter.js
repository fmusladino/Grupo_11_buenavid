const express = require ('express');
const { controller }  = require('../controller/productoController');
const router = express.Router();
const {check} = require('express-validator');

const productoController  = require('../controller/productoController');


router.get('/producto', productoController.controller.productDetail);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/producto', uploadFile.single('photo'), mainController.controller.productDetail);