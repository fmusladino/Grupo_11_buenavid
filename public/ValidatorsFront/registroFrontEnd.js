// Validación front-end del formulario de registro

const formulario = document.querySelector("#formulario-registro")

const validacion = (e) => {

    const divErrores = document.querySelector("#errores-front")

    divErrores.innerHTML = "";

    const nombre = formulario.first_name

    if ( nombre.value == "" ) {
       divErrores.innerHTML += '<p> El nombre no puede estar vacío </p>'
    }
    if ( nombre.value.length < 2 && !nombre.value == "" ) {
        divErrores.innerHTML += '<p> El nombre tiene que tener un mínimo de 2 letras </p>'
    }

    const apellido = formulario.last_name

    if ( apellido.value == "" ) {
        divErrores.innerHTML += '<p> El apellido no puede estar vacío </p>'
    }
    if ( apellido.value.length < 2 && !apellido.value == "" ) {
        divErrores.innerHTML += '<p> El apellido tiene que tener un mínimo de 2 letras </p>'
    }

    const email = formulario.email

    if ( email.value == "" ) {
       divErrores.innerHTML += '<p> El email no puede estar vacío </p>'
    }
    const validadorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validadorEmail.test(email.value) && !email.value == "" ) {
        divErrores.innerHTML += '<p> El formato del Email es inválido </p>';
    }

    const contraseña = formulario.password

    if ( contraseña.value.length < 6 && !contraseña.value == "" ) {
        divErrores.innerHTML += '<p> La contraseña tiene que tener un mínimo de 6 letras </p>'
    }

    /*const validadorContraseña = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;

    if (!validadorContraseña.test(contraseña.value)) {
        divErrores.innerHTML += '<p> La contraseña debe contener mayúsculas, minúsculas, un número y un caracter especial </p>';
    }*/

    if ( contraseña.value == "" ) {
        divErrores.innerHTML += '<p> La contraseña es obligatoria </p>'
    }

    if (divErrores.innerHTML === "") {
        // Si no hay errores, se envía el formulario
        formulario.submit();
    } else {
        // Si hay errores, se evita el envío del formulario
        e.preventDefault();
        alert("Existen errores en el formulario");
    }

}

formulario.addEventListener("submit", validacion)