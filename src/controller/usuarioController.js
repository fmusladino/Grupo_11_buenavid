const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

const { validationResult } = require('express-validator');

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');

const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//--Require de la base de datos--//
const db = require('../db/models')
const User = db.User





const usuarioController = {



  //--Mostar Formulario de Login y Registro--//
  mostrarFormularioLogin: (req, res) => { return res.render('login') },
  mostrarFormularioRegistroUsuario: (req, res) => { return res.render('register') },





  //--Mostrar Formulario de Editar Usuario--//--A MODIFICAR
  mostrarFormularioModificarUsuario: (req, res) => {
    const usuarioId = req.params.id;
    const usuarioAMostrar = usuarios.find((user) => user.id == usuarioId);
    if (usuarioAMostrar == undefined) { return res.render('not-found') };
    //en la vista hay que referirse a "usuario" como el objeto que contiene los campos a mostrar
    const viewData = { usuario: usuarioAMostrar };
    return res.render('editarUsuario', viewData);
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
    User.create(user).then(() => {
      return res.redirect('/');
    })
      .catch(error => console.log(error));
  },






  //--Logica para Modificar Usuario--//(Falta hacerlo con Sequelize)
  almacenaUsuarioModificado: (req, res) => {


    const usuarioIndex = usuarios.findIndex(
      (user) => {
        return user.id == req.params.id
      }
    )
    if (usuarioIndex == -1) {
      return res.send('El usuario que busca no existe')
    }
    // aca debo ver la forma de guardar el password anterior hasheado
    //en el caso de que hubiera cambiado el el password, hashearlo, sino mantener el anterior

    let passwordNuevaH = usuarios[usuarioIndex].password;

    if (req.body.password != "") {
      passwordNuevaH = bcrypt.hashSync(req.body.password, 10);
    };

    usuarios[usuarioIndex] = {
      id: usuarios[usuarioIndex].id,
      rol: req.body.rol,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date: req.body.date,
      email: req.body.email,
      cellphone: req.body.cellphone,
      password: passwordNuevaH
    }

    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));

    return res.redirect('/');
  },







  //--Logica para Borrar Usuario--//--A MODIFICAR
  borrarUsuario: (req, res) => {

    const newUsuarios = usuarios.filter((user) => user.id != req.params.id);

    fs.writeFileSync(usuariosFilePath, JSON.stringify(newUsuarios, null, 2));

    return res.redirect('/');
  },








  mostrarVistaLoginOk: (req, res) => {
    //lógica para controlar los valores ingresados contra los de la BD
    // si el usuario existe y el password es el correcto entones mostrar vista indexLoginOk

    const usuarioIndex = usuarios.findIndex(
      (user) => {
        return user.email == req.body.email
      })
    if (usuarioIndex == -1) {
      return res.render('usuarioNotFound')
    }
    let check = bcrypt.compareSync(req.body.password, usuarios[usuarioIndex].password)
    if (check) {

      const productosRecomendados = products.filter(product => product.recomended == "true");
      const productosEnPromocion = products.filter(product => product.discount >= 10)
      const viewData = {
        productosRecomendados: productosRecomendados,
        productosEnPromocion: productosEnPromocion,
        usuario: usuarios[usuarioIndex]
      };
      return res.render('indexLoginOk', viewData);

    } else {
      return res.render('login');
    }

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
            req.session.userLogged = userToLogin;
console.log(req.session.userLogged)
//--Si el usuario apreto el checkbox de Recordame--//
//--Creamos una cookie que se le guarde session por 24 horas--//
            if (req.body.recordarme) {
              res.cookie({ where: { email: req.body.email } }, { maxAge: 1000 * 60 * 60 * 24 })
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


      //const usuarioIndex=  usuarios.findIndex(
       // (user) => {
      //  return user.email == req.body.email
   // })
  //  if (usuarioIndex == -1) {
    //  return res.render('usuarioNotFound')
  //  }
   // let check = bcrypt.compareSync(req.body.password, usuarios[usuarioIndex].password)
   // if (check) {

    //  const productosRecomendados = products.filter(product => product.recomended=="true");
      //  const productosEnPromocion = products.filter(product=> product.discount >= 10)
        //const viewData={
          //  productosRecomendados: productosRecomendados,
          // productosEnPromocion: productosEnPromocion,
           // usuario: usuarios[usuarioIndex]
   // };

    //Hasta acá es la misma lógica que usó Aleto, de acá en adelante, cuando comprueba info, o devuelve una cookie guardada o renderiza de nuevo login con los errores que detectó

    //  res.cookie("cookieLogueado", "Usuario logueado")

     // return res.render("index", viewData);

   // } else{
    //  let errors = validationResult(req);
   //   return res.render('login', { errors : errors.mapped(), old: req.body });
   // }
    



module.exports = usuarioController