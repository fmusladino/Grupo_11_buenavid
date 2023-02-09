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



//Rutas
//-Registro--//
router.get('/registro', usuarioController.mostrarFormularioRegistroUsuario);
router.post('/registro', uploadFile.single('image'), usuarioController.almacenarNuevoUsuario);

//--Login--//
router.get('/login', usuarioController.mostrarFormularioLogin);
router.post('/login',validacionesParaLogin, usuarioController.logueado);

//--Editar usuario--//
router.get('/editar/:id', usuarioController.mostrarFormularioModificarUsuario);
router.put('/editar/:id',uploadFile.single('image'),usuarioController.almacenaUsuarioModificado);

//--Eliminar usuario--//
router.delete('/eliminar/:id', usuarioController.borrarUsuario);

//-- API lista de usuarios y detalles de usuario --//
router.get('/api/users', usuarioController.listaUsuarios)
router.get('/api/users/:id', usuarioController.detalleUsuario)

module.exports = router;