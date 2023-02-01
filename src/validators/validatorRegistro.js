//--Funciona Mal--//
const { body } = require('express-validator');

const validacionesParaRegistro = [

    body('first_name')
        .notEmpty().withMessage('El nombre es obligatorio').bail()  
        .isLength({min: 3}).withMessage('El nombre debe tener como mínimo 3 caractéres'),

    body('last_name')
        .notEmpty().withMessage('El apellido es obligatorio').bail()
        .isLength({min: 4}).withMessage('El apellido debe tener como mínimo 4 caractéres'),

        //--Averiguar como hacer validaciones con el date--//
    body('date')
        .notEmpty().withMessage('Debes completar la fecha de nacimiento'),

    body('email')
    .notEmpty().withMessage('Debes completar el email').bail()  
    .isEmail().withMessage('Email invalido'),

    body('cellphone')
        .notEmpty().withMessage('Debes completar el telefono de contacto').bail()
        .isLength({min: 10}).withMessage('Su numero es invalido').bail()
        .isNumeric().bail()
        .custom((value, { req }) => {
            if(value === +54){
                return true
            }else{
                throw new Error('Su numero debe llevar +54')
            }
        }),

    body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres')
                

];


module.exports=validacionesParaRegistro