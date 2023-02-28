const { body } = require('express-validator');

const db = require('../db/models')
const User = db.User

const validacionesParaCargaUsuario = [

    body('first_name')
        .not().isEmpty().withMessage('El nombre es obligatorio').bail()
        .isLength({min: 3}).withMessage('El nombre debe tener como mínimo 3 caractéres'),

    body('last_name')
        .not().isEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({min: 4}).withMessage('El apellido debe tener como mínimo 4 caractéres'),

        //--Averiguar como hacer validaciones con el date--//
    body('date')
        .not().isEmpty().withMessage('Debes completar la fecha de nacimiento'),


    body('cellphone')
        .not().isEmpty().withMessage('Debes completar el telefono de contacto').bail()
        .isLength({min: 10}).withMessage('Su numero es invalido').bail()
        .isNumeric().bail()
        /*.custom((value, { req }) => {
            if(value === +54 + value){
                return true
            }else{
                throw new Error('Su numero debe llevar +54')
            }
        })*/,

    body('password')
        .not().isEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
                
];


module.exports=validacionesParaCargaUsuario