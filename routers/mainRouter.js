const express = require ('express');
const { controller }  = require('../controller/mainController');
const router = express.Router();
const multer = require('multer');

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