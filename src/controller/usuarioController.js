const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');
const { body } = require('express-validator');


//--Require de la base de datos--//
const db = require('../db/models')
const User = db.User
const Role=db.Role


const usuarioController = {



  //--Mostar Formulario de Login y Registro--//
  mostrarFormularioLogin: (req, res) => { return res.render('login') },
  mostrarFormularioRegistroUsuario: (req, res) => { return res.render('register') },


  //--Mostrar Formulario de Editar Usuario--//
  mostrarFormularioModificarUsuario: (req, res) => {
    const traerRoles=Role.findAll();
    const buscarUsuario=User.findByPk(req.params.id,{
      include:[{association:"role"}]
    })
    Promise.all([traerRoles,buscarUsuario])
    .then((resultado)=>{

      if(resultado[1]==null){

        res.render('usuarioNotFound')
      }
      const viewdata={
        roles:resultado[0],
        usuario:resultado[1],
        valores: resultado[1]
      }
      if(req.session.userLogged){
        viewdata.userLogged =req.session.userLogged
     }
      res.render('editarUsuario',viewdata)
    })
  },

  //--Crear Nuevo Usuario--//
  almacenarNuevoUsuario: (req, res) => {
    
    //--Validators para Registro--//
    const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
          return res.render('register', {
            errors: resultValidation.mapped(),
            valores: req.body
          })
        }

            //--Variable que junta los campos del formulario--//
          let user = {
            rol_id: req.body.rol,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            date: req.body.date,
            email: req.body.email,
            cellphone: req.body.cellphone,
            password: bcrypt.hashSync(req.body.password, 10)
          }

          //--Logica para crear un nuevo usuario y se guarde en la base de datos--//
          User.create(user)
          .then( (user) =>{
            req.session.userLogged = user.dataValues;
          })
          .then(() => {
            return res.redirect('/');
          })
            .catch(error => console.log(error));

  },

  almacenaUsuarioModificado: async (req, res) => {

    const buscarUsuario= await User.findByPk(req.params.id,{
      include:[{association:"role"}]
    })
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      console.log(req.body)
      const viewData={
        errors: resultValidation.mapped(),
        valores: req.body,
        usuario: buscarUsuario,
      }
      if(req.session.userLogged){
        viewData.userLogged =req.session.userLogged
     }
      return res.render('editarUsuario',viewData )
    }
    res.clearCookie("recordarUsuario")
    if (req.body.password == "" || req.body.password == null) {
      console.log(req.body)
      User.update ({
        rol_id: req.body.rol,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date: req.body.date,
        email: req.body.email,
        cellphone: req.body.cellphone,
        }, {
        where: {
            id: req.params.id,
        }
      })
      .then( (usuario) => {
        req.session.userLogged.first_name = req.body.first_name
        req.session.save()
      })
      .then(()=> {return res.redirect('/')})
    } else {
      console.log(req.body)
      User.update ({
        rol_id: req.body.rol,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date: req.body.date,
        email: req.body.email,
        cellphone: req.body.cellphone,
        password: bcrypt.hashSync(req.body.password, 10)
        }, {
        where: {
            id: req.params.id,
        }
      })
      .then( (usuario) => {
        req.session.userLogged.first_name = req.body.first_name
        req.session.save()
      })
      .then(()=> {return res.redirect('/')})
    }

  },


  //--Logica para Borrar Usuario--//--A MODIFICAR
  borrarUsuario: (req, res) => {

    User.destroy(
      { where: { id: req.params.id } }
    )
    res.clearCookie("recordarUsuario")
    req.session.destroy()

    return res.redirect('/');
  },



  //--Logistica de Login--//
  logueado: (req, res) => {

    //--Validator--//
    const resultValidation = validationResult(req);

    if (resultValidation.errors.length > 0) {
      return res.render('login', {
        errors: resultValidation.mapped(),
        valores: req.body
      })
    }


    //--Buscamos el mismo email en la bd con el email que puso el cl en el formulario--//
    User.findOne({
      where: { email: req.body.email }
    })
      //--Si el email es el mismo--//
      //--Descriptamos las passwords y comparamos si son las mismas--//
      .then((userToLogin) => {
        if (userToLogin) {
          const isOkPassword = bcrypt.compareSync(req.body.password, userToLogin.password);
          if (isOkPassword) {
            req.session.userLogged = userToLogin.dataValues;
//--Si el usuario apreto el checkbox de Recordame--//
//--Creamos una cookie que se le guarde session por 24 horas--//
            if (req.body.recordarme) {
              res.cookie("recordarUsuario", { where: { email: req.body.email } }, { maxAge: 1000 * 60 * 60 * 24 })
            }
            //--Lo mandamos a Index--//
            return res.redirect('/');
          }
          //--Aca si hubo algun error se vuelve a mandar al usuario a /login --//
          return res.render('login', {
            OldData: req.body,
            errors: {
              password: {
                msg:'Credenciales Invalidas'
              }
            }
          });
        }
        return res.render('login', {
          errors: {
            email: {
              msg: 'Credenciales Invalidas'
            }
          }
        })
      })
  },

  logout: (req, res) => {
      res.clearCookie("recordarUsuario")
      req.session.destroy()
      return res.redirect("/")
  },

  
  listaUsuarios: (req, res) => {
    
    const obj = {}

    db.User.findAll( {attributes: { exclude : ['password']}} )

      .then( usersList => {
        obj.count = usersList.length
        usersList.map(usuario => 
          usuario.detail = '/usuarios/api/user/' + usuario.id
        )
        obj.users = usersList
        return res.json(obj.users)
      })
    },

  detalleUsuario: (req, res) => {

    const user = {}

    db.User.findByPk(req.params.id, {attributes: { exclude : ['password']}})

    .then( usuario => {
      usuario.imageURL = 'usuario/api/users/id/' + 'aca-deberia-ir-imagen' + usuario.id
      return res.json(usuario)
    })
  }
  
}


module.exports = usuarioController