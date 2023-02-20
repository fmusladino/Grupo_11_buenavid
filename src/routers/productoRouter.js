const express = require ('express');
const router = express.Router();
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
const userRole = require('../middlewares/userRole')


//Rutas

//--Detalle--//
router.get('/detalle/:productsId/', productoController.productDetail);

//--Carga--//
router.get('/carga', userRole, productoController.mostrarFormularioCargaProducto);

router.post('/carga', validacionesParaCarga, uploadFile.single('image'), productoController.almacenaProducto);

//--Edicion--//
router.get('/edicion/:id', userRole, productoController.mostrarFormularioEdicionProducto);

router.put('/edicion/:id', validacionesParaEdicion, uploadFile.single('image'), productoController.almacenaProductoEditado);

//--Eliminar--//
router.delete('/eliminar/:id', userRole, productoController.eliminarProducto);




//--Rutas para vinos especificos--// 

router.get('/rosados',productoController.productosRosados)

router.get('/blancos',productoController.productosBlancos)

router.get('/tintos',productoController.productosTintos)

router.get('/espumantes',productoController.productosEspumantes)

router.get('/promociones',productoController.productosEnPromo)



module.exports=router