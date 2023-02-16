//Middleware que chequea si el usuario está logueado para permitirle entrar a una view--//

//--No funciona--//

const loginCheck= (req, res, next) => {
    
    if (res.session.userLogged) {
        next();  
    }
    else {
        res.redirect("/usuario/login");
    }

}

module.exports= loginCheck