//Middleware que chequea si el usuario está logueado para permitirle entrar a una view--//


const loginCheck= (req, res, next) => {
    
    if (req.session.userLogged) {
        return res.redirect("/")  
    }
    next()

}

module.exports= loginCheck