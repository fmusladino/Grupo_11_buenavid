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
        cb(null, Date.now() + file.originalname);
    }
});
const uploadFile = multer({storage});

//Validaciones 
const validacionesParaCarga= require('../validators/validatorCarga')
const validacionesParaEdicion= require('../validators/validatorEdicion')
//Middleware
const loginCheck = require('../middlewares/loginCheck')


//Rutas

router.get('/detalle/:productsId/', loginCheck, productoController.productDetail);

router.get('/carga', loginCheck, productoController.mostrarFormularioCargaProducto);

router.post('/carga', loginCheck, uploadFile.single('image'), validacionesParaCarga, productoController.almacenaProducto);

router.get('/edicion/:id', loginCheck, productoController.mostrarFormularioEdicionProducto);

router.put('/edicion/:id', loginCheck, uploadFile.single('image'),validacionesParaEdicion, productoController.almacenaProductoEditado);

router.delete('/eliminar/:id', loginCheck, productoController.eliminarProducto);

// NO ESTOY SEGURO SI SIRVE ESTA RUTA PARA ALGO
//router.post('/', uploadFile.single('image'), mainController.controller.productDetail);


//Rutas para vinos especificos 

router.get('/rosados',productoController.productosRosados)

router.get('/blancos',productoController.productosBlancos)

router.get('/tintos',productoController.productosTintos)

router.get('/espumantes',productoController.productosEspumantes)

router.get('/promociones',productoController.productosEnPromo)



module.exports=router