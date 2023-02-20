// Middleware para determinar si el usuario logueado es cliente o admin

const session = require('express-session');
const db = require('../db/models')
const Role=db.Role

const userRole= async (req, res, next) => {
    
    if (req.session.userLogged) {
        const traerRoles = await Role.findByPk(req.session.userLogged.rol_id)

        if ( traerRoles.nombre == "Administrador" ) {
            next(); 
        } else {
            return res.redirect("back")
        }

    }
    else {
        return res.redirect("back")
    }

}

module.exports= userRole