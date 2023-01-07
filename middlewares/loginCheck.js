//Middleware que chequea si el usuario está logueado para permitirle entrar a una view

const loginCheck= (req, res, next) => {

    if (req.cookies.cookieLogueado) {
        next();  
    }
    else {
        res.redirect("/usuario/login");
    }

}

module.exports= loginCheck