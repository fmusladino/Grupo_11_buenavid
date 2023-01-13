//NO TOCAR EN UN FUTURO TENDRA USO

const {validationResult} = require('express-validator');


const funcionParaValidarFormulariosDeCargaYEdicion= (req,res,next)=>{
    const resultValidation = validationResult(req);

    if(resultValidation.errors.length > 0){
     return res.render('formCarga',{
         errors: resultValidation.mapped(),
         valores: req.body
     })
    }
    next()
}
module.exports=funcionParaValidarFormulariosDeCargaYEdicion




