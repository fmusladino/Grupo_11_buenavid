//Middleware que detecta si los datos del usuario están guardados en la session para devolver la vista de Header




const userSession = (req, res, next) => {
        if(req.session.userLogged){
            viewData.userLogged =req.session.userLogged
        }
        next()
    }


module.exports = userSession


