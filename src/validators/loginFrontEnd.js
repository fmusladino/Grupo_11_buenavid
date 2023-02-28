// Validación front-end del formulario de carga de producto

const formulario = document.querySelector("#formulario-login")

const divErrores = document.querySelector("#errores-front")

const db = require('../db/models')
const User = db.User

const validacion = (e) => {

    e.preventDefault()

    const contraseña = formulario.password
    const mail = formulario.email

    divErrores.innerHTML = ""

     //Contraseña
     if ( contraseña.value == "" ) {
        divErrores.innerHTML += '<p> La contraseña es obligatoria </p>'
     }

     //Email
     if ( mail.value == "" ) {
        divErrores.innerHTML += '<p> El campo email no puede estar vacío </p>'
     }
     if ( !User.findOne({
        where: { email: mail.value },
      }) ) {
        divErrores.innerHTML += '<p> El  email ingresado no existe en nuestra base de datos </p>'
     }
     /*Cómo valido mail?
     if ( !mail.value.isLength( { min : 2 }) ) {
         divErrores.innerHTML += '<p> El nombre tiene que tener un mínimo de 2 letras </p>'
     } */

}

formulario.addEventListener("submit", validacion)