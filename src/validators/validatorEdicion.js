const { body } = require('express-validator');

const validacionesParaEdicion = [

    body('description')
        .notEmpty().withMessage('Debes completar con la descripción').bail()  
        .isLength({min: 10}).withMessage('la descripción debe tener como mínimo 10 caractéres'),

    body('winery')
        .notEmpty().withMessage('Debes completar la bodega').bail()
        .isLength({min: 3}).withMessage('la bodega debe tener como mínimo 3 caractéres'),

    body('origin')
        .notEmpty().withMessage('Debes completar el origen regional').bail()  
        ,

    body('year')
        .notEmpty().withMessage('Debes completar el año').bail()
        .isLength({min: 4}).withMessage('El año debe tener como mínimo 4 caractéres'),

    body('price')
        .notEmpty().withMessage('Debes completar el precio').bail()
        .isLength({min: 3}).withMessage('El precio debe tener como mínimo 3 caractéres (numércios, además del "."'),

    body('discount')
        .notEmpty().withMessage('Debes completar el descuento - con 0 si no hubiera descuento').bail()
        .isNumeric().bail()
        .custom((value, { req }) => {
            if(value < 0 || value >80){
                throw new Error('El descuento debe ser de 80% para abajo!')
            }else{
                return true
            }
           
             })
                

];


module.exports=validacionesParaEdicion