const { body } = require('express-validator');

const validacionesParaLogin = [

    body('email')
        .notEmpty().withMessage('Debes completar el email').bail()  
        .isEmail().withMessage('Email invalido'),

    body('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres')   

];

module.exports=validacionesParaLogin