// Validación front-end del formulario de login

const formulario = document.querySelector("#formulario-login")

const validacion = (e) => {

    const divErrores = document.querySelector("#errores-front")

    divErrores.innerHTML = "";

    const email = formulario.email

    if ( email.value == "" ) {
       divErrores.innerHTML += '<p> El email no puede estar vacío </p>'
    }
    const validadorEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validadorEmail.test(email.value)) {
        divErrores.innerHTML += '<p> El formato del Email es inválido </p>';
    }

    const contraseña = formulario.password

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