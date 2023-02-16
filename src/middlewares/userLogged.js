//Middleware que detecta si los datos del usuario están guardados en la session para devolver la vista de Header

//--No funciona--//


const userSession = (req, res, next) => {
        if(req.session.userLogged){
          userLogged =req.session.userLogged
        }
        res.render(userLogged)
        next()
    }


module.exports = userSession


