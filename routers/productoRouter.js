const express = require ('express');
const router = express.Router();
const { body } = require('express-validator');
const multer = require('multer');



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

//Validaciones 
const validacionesParaCarga= require('../validators/validatorCarga')


//Rutas



router.get('/detalle/:productsId/', productoController.productDetail);

router.get('/carga', productoController.mostrarFormularioCargaProducto);

router.post('/carga', uploadFile.single('photo'), validacionesParaCarga, productoController.almacenaProducto);

router.get('/edicion/:id',productoController.mostrarFormularioEdicionProducto);

router.put('/edicion/:id',uploadFile.single('photo'), productoController.almacenaProductoEditado);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/', uploadFile.single('photo'), mainController.controller.productDetail);


//Rutas para vinos especificos 

router.get('/rosados',productoController.productosRosados)

router.get('/blancos',productoController.productosBlancos)

router.get('/tintos',productoController.productosTintos)

router.get('/espumantes',productoController.productosEspumantes)



module.exports=router