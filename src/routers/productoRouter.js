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

//--Middleware del Login check--//
//const loginCheck = require('../middlewares/loginCheck')


//Rutas

//--Detalle--//
router.get('/detalle/:productsId/', productoController.productDetail);

//--Carga--//
router.get('/carga', productoController.mostrarFormularioCargaProducto);

router.post('/carga', uploadFile.single('image'), validacionesParaCarga, productoController.almacenaProducto);

//--Edicion--//
router.get('/edicion/:id',productoController.mostrarFormularioEdicionProducto);

router.put('/edicion/:id', uploadFile.single('image'),validacionesParaEdicion, productoController.almacenaProductoEditado);

//--Eliminar--//
router.delete('/eliminar/:id', productoController.eliminarProducto);




//--Rutas para vinos especificos--// 

router.get('/rosados',productoController.productosRosados)

router.get('/blancos',productoController.productosBlancos)

router.get('/tintos',productoController.productosTintos)

router.get('/espumantes',productoController.productosEspumantes)

router.get('/promociones',productoController.productosEnPromo)



module.exports=router