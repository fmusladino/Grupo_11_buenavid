//Middleware que detecta si los datos del usuario están guardados en la session para devolver la vista de Header

//--No funciona--//


const userSession = (req, res, next) => {

        if(req.session.userLogged){
          viewData.userLogged =req.session.userLogged
        }
        res.render(viewData)
        next()
    }


module.exports = userSession


