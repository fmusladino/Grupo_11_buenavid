const express = require ('express');
const { controller }  = require('../controller/mainController');
const router = express.Router();
const multer = require('multer');
const {check} = require('express-validator');

const validateRegister = [

    check('description')
        .notEmpty().withMessage('Debes completar con la descripción').bail,
    check('description')    
        .isLength({min: 10}).withMessage('la descripción debe tener como mínimo 10 caractéres'),

    check('winery')
        .notEmpty().withMessage('Debes completar la bodega').bail,
    check('winery')    
        .isLength({min: 3}).withMessage('la bodega debe tener como mínimo 3 caractéres'),

    check('origin')
        .notEmpty().withMessage('Debes completar el origen regional').bail,
    check('origin')    
        .isLength({min: 5}).withMessage('El origen regional debe tener como mínimo 5 caractéres'),

    check('year')
        .notEmpty().withMessage('Debes completar el año').bail,
    check('year')    
        .isLength({min: 4}).withMessage('El año debe tener como mínim 4 caractéres'),

    check('price')
        .notEmpty().withMessage('Debes completar el precio').bail,
    check('price')
        .isLength({min: 3}).withMessage('El precio debe tener como mínimo 3 caractéres (numércios, además del "."'),

    check('discount')
        .notEmpty().withMessage('Debes completar el descuento - con 0 si no hubiera descuento').bail
        
];

const storage = multer.diskStorage({
        destination:    function (req, file, cb) {
            cb(null, './public/images/productos')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
});

const uploadFile = multer({storage});


const mainController = require('../controller/mainController');

router.get('/', mainController.controller.index);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/', uploadFile.single('photo'), mainController.controller.index);

router.get('/login', mainController.controller.login);

router.post('/login', mainController.controller.login);

router.get('/carrito', mainController.controller.productCar);

router.post('/carrito', mainController.controller.productCar);

router.get('/producto', mainController.controller.productDetail);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/producto', uploadFile.single('photo'), mainController.controller.productDetail);

router.get('/registro', mainController.controller.register);

router.post('/registro', mainController.controller.register);



router.get('/carga', mainController.controller.crear)

router.post('/', uploadFile.single('photo'), mainController.controller.carga)



router.get('/edicion',mainController.controller.edicion)

router.post('/edicion',uploadFile.single('photo'), mainController.controller.edicion)



module.exports = router;