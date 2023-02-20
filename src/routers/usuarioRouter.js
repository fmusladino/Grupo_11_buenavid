const express = require ('express');
const router = express.Router();
const multer = require('multer');
const {check} = require('express-validator');


//Multer
const storage = multer.diskStorage({
    destination:    function (req, file, cb) {
        cb(null, './public/images/usuarios')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const uploadFile = multer({storage});

//--Controller--//
//Require de Controller
const usuarioController = require('../controller/usuarioController');

//--Base de datos--//

//--Require de la base de datos--//
const db= require('../db/models')

//--Require del modelo User--//
const User= db.User

//--Validaciones--//

//--Validaciones de Login--//
const validacionesParaLogin=require('../validators/validatorLogin')
//--Validaciones de Registro---->(Con errores)--> en proceso//
const validacionesParaRegistro=require('../validators/validatorRegistro')


//--Middleware--//
const loginCheck = require('../middlewares/loginCheck')
const matchearUserId = require('../middlewares/matchearUserId')


//Rutas
//-Registro--//
router.get('/registro', loginCheck, usuarioController.mostrarFormularioRegistroUsuario);
router.post('/registro', validacionesParaRegistro, usuarioController.almacenarNuevoUsuario);

//--Login--//
router.get('/login',loginCheck, usuarioController.mostrarFormularioLogin);
router.post('/login',validacionesParaLogin, usuarioController.logueado);

//--Logouot--//
router.get('/logout', usuarioController.logout);

//--Editar usuario--//
router.get('/editar/:id', matchearUserId, usuarioController.mostrarFormularioModificarUsuario);
router.put('/editar/:id',uploadFile.single('image'),usuarioController.almacenaUsuarioModificado);

//--Eliminar usuario--//
router.delete('/eliminar/:id', usuarioController.borrarUsuario);

//-- API lista de usuarios y detalles de usuario --//
router.get('/api/users', usuarioController.listaUsuarios)
router.get('/api/users/:id', usuarioController.detalleUsuario)

module.exports = router;