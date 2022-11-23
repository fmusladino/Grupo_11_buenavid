const express = require ('express');
const router = express.Router();
const {check} = require('express-validator');
const multer = require('multer');


const validaciones = [

    check('description')
        .notEmpty().withMessage('Debes completar con la descripción').bail()  
        .isLength({min: 10}).withMessage('la descripción debe tener como mínimo 10 caractéres'),

    check('winery')
        .notEmpty().withMessage('Debes completar la bodega').bail()
        .isLength({min: 3}).withMessage('la bodega debe tener como mínimo 3 caractéres'),

    check('origin')
        .notEmpty().withMessage('Debes completar el origen regional').bail()  
        .isLength({min: 5}).withMessage('El origen regional debe tener como mínimo 5 caractéres'),

    check('year')
        .notEmpty().withMessage('Debes completar el año').bail()
        .isLength({min: 4}).withMessage('El año debe tener como mínimo 4 caractéres'),

    check('price')
        .notEmpty().withMessage('Debes completar el precio').bail()
        .isLength({min: 3}).withMessage('El precio debe tener como mínimo 3 caractéres (numércios, además del "."'),

    check('discount')
        .notEmpty().withMessage('Debes completar el descuento - con 0 si no hubiera descuento').bail()
        
];


//Require de Controller 
const productoController  = require('../controller/productoController');

//Multer
const storage = multer.diskStorage({
    destination:    function (req, file, cb) {
        cb(null, './public/images/productos')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png');
    }
});

const uploadFile = multer({storage});


//Rutas

router.get('/detalle/:productsId/', productoController.productDetail);

router.get('/carga', productoController.mostrarFormularioCargaProducto);

router.post('/carga', uploadFile.single('photo'), validaciones, productoController.almacenaProducto);

router.get('/edicion/:id',productoController.mostrarFormularioEdicionProducto);

router.post('/edicion',uploadFile.single('photo'), productoController.almacenaProductoEditado);



// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/', uploadFile.single('photo'), mainController.controller.productDetail);

module.exports=router