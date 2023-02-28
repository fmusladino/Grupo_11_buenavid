// Validación front-end del formulario de carga de producto

const formulario = document.querySelector("#formulario-registro")

const divErrores = document.querySelector("#errores-front")

const validacion = (e) => {

    e.preventDefault()

    const nombre = formulario.first_name
    const apellido = formulario.last_name
    const contraseña = formulario.password
    const mail = formulario.email

    divErrores.innerHTML = ""

    //Nombre
    if ( nombre.value == "" ) {
       divErrores.innerHTML += '<p> El nombre no puede estar vacío </p>'
    }
    if ( !nombre.value.isLength( { min : 2 }) ) {
        divErrores.innerHTML += '<p> El nombre tiene que tener un mínimo de 2 letras </p>'
    }

    //Apellido
    if ( apellido.value == "" ) {
        divErrores.innerHTML += '<p> El apellido no puede estar vacío </p>'
     }
     if ( !apellido.value.isLength( { min : 2 }) ) {
         divErrores.innerHTML += '<p> El apellido tiene que tener un mínimo de 2 letras </p>'
     }

     //Contraseña
     if ( contraseña.value == "" ) {
        divErrores.innerHTML += '<p> La contraseña es obligatoria </p>'
     }
     if ( !contraseña.value.isLength( { min : 8 }) ) {
         divErrores.innerHTML += '<p> La contraseña tiene que tener un mínimo de 8 caracteres </p>'
     }

     //Email
     if ( mail.value == "" ) {
        divErrores.innerHTML += '<p> El campo email no puede estar vacío </p>'
     }
     /*Cómo valido mail?
     if ( !mail.value.isLength( { min : 2 }) ) {
         divErrores.innerHTML += '<p> El nombre tiene que tener un mínimo de 2 letras </p>'
     } */

}

formulario.addEventListener("submit", validacion)