// Validación front-end del formulario de carga de producto

    const formulario = document.querySelector("#formulario-carga")

    const validacion = (e) => {

        const divErrores = document.querySelector("#errores-front")

        divErrores.innerHTML = "";

        const descripcion = formulario.description

        if ( descripcion.value == "" ) {
           divErrores.innerHTML += '<p> La descripción no puede estar vacía </p>'
        }
        if ( descripcion.value.length < 10 && !descripcion.value == "" ) {
            divErrores.innerHTML += '<p> La descripción tiene que tener un mínimo de 4 letras </p>'
        }

        const bodega = formulario.winey

        if ( bodega.value == "" ) {
            divErrores.innerHTML += '<p> Debes completar la Bodega </p>'
         }
         if ( bodega.value.length < 3 && !bodega.value == "" ) {
             divErrores.innerHTML += '<p> El nombre de la Bodega tiene que tener un mínimo de 3 letras </p>'
         }

        const imagen = formulario.querySelector("#file");
        const allowedExtensions = ["jpg", "png", "jpeg", "gif"];

        if (imagen.files.length > 0) {
            const fileExtension = imagen.files[0].name
            .split(".")
            .pop()
            .toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
            divErrores.innerHTML +=
                "<p>El archivo seleccionado no es una imagen válida (solo se permiten .jpg, .png, .jpeg o .gif)</p>";
            }
        } else {
            divErrores.innerHTML += "<p>Debe seleccionar una imagen</p>";
        }

        if (divErrores.innerHTML === "") {
            // Si no hay errores, se envía el formulario
            formulario.submit();
        } else {
            // Si hay errores, se evita el envío del formulario
            e.preventDefault();
            alert("Existen errores en el formulario")
        }

    }

    formulario.addEventListener("submit", validacion)