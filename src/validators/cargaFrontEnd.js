// Validación front-end del formulario de carga de producto

    const formulario = document.querySelector("#formulario-carga")

    const divErrores = document.querySelector("#errores-front")

    const validacion = (e) => {

        e.preventDefault()

        const descripcion = formulario.description

        divErrores.innerHTML = ""

        if ( descripcion.value == "" ) {
           divErrores.innerHTML += '<p> La descripción no puede estar vacía </p>'
        }
        if ( !descripcion.value.isLength( { min : 4 }) ) {
            divErrores.innerHTML += '<p> La descripción tiene que tener un mínimo de 4 letras </p>'
        }

    }

    formulario.addEventListener("submit", validacion)