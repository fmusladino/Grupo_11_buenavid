// Validación front-end del formulario de carga de 

window.addEventListener('load', function(){
    
    const formulario = document.querySelector(form.formulario-carga)

    formulario.addEventListener( (e) => {
        
        let errores = [];

        const descripcion = document.querySelector(input.description)

        if ( descripcion.value = "" ) {
            errores.push("La descripción no puede estar vacía")
        }
        if ( !descripcion.value.isLength( { min : 4 }) ) {
            errores.push("La descripción tiene que tener un mínimo de 4 letras")
        }

        if ( errores.length > 0 ) {
            e.preventDefault()
        } else {
            next()
        }

    })

})