// Middleware que permite editar al usuario sus propios datos y no el de otro usuario

const matchearUserId= (req, res, next) => {

    if (req.session.userLogged) {
        if (req.session.userLogged.id == req.params.id) {
            next()  
        } else {
            return res.render("not-found")
        }
    } else {
        return res.redirect("/")
    }

}

module.exports= matchearUserId