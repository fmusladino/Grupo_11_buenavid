// Validación front-end del formulario de carga de producto

    const formulario = document.querySelector("#formulario-carga")

    const divErrores = document.querySelector("#errores-front")

    const validacion = (e) => {

        e.preventDefault()

        const descripcion = formulario.description

        if ( descripcion.value = "" ) {
            errores.push("La descripción no puede estar vacía")
        }
        if ( !descripcion.value.isLength( { min : 4 }) ) {
            errores.push("La descripción tiene que tener un mínimo de 4 letras")
        }

        const imagen = formulario.image

        const extension = imagen.value

        console.log("11111111111")
        console.log(extension)
        console.log("11111111111")

        if ( imagen ) {
            errores.push("El formato de imagen elegido no es válido (JPG, JPEG, PNG o GIF)")
        }

    }

    formulario.addEventListener("submit", validacion)