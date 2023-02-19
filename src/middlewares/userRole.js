// Middleware para determinar si el usuario logueado es cliente o admin

const session = require('express-session');
const db = require('../db/models')
const Role=db.Role

const userRole= (req, res, next) => {
    
    if (req.session.userLogged) {
        if ( req.session.userLogged.rol_id == Role.id && Role.id === 2) {
            next(); 
        } else {
            return res.redirect("/")
        }

    }
    else {
        return res.redirect("/")
    }

}

module.exports= userRole