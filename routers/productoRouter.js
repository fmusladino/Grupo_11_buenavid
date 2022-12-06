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
const validacionesParaEdicion= require('../validators/validatorEdicion')


//Rutas

router.get('/detalle/:productsId/', productoController.productDetail);

router.get('/carga', productoController.mostrarFormularioCargaProducto);

router.post('/carga', uploadFile.single('image'), validacionesParaCarga, productoController.almacenaProducto);

router.get('/edicion/:id',productoController.mostrarFormularioEdicionProducto);

router.put('/edicion/:id',uploadFile.single('image'),validacionesParaEdicion, productoController.almacenaProductoEditado);

router.delete('/eliminar/:id', productoController.eliminarProducto);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/', uploadFile.single('image'), mainController.controller.productDetail);


//Rutas para vinos especificos 

router.get('/rosados',productoController.productosRosados)

router.get('/blancos',productoController.productosBlancos)

router.get('/tintos',productoController.productosTintos)

router.get('/espumantes',productoController.productosEspumantes)

router.get('/promociones',productoController.productosEnPromo)



module.exports=router