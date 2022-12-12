const path = require ('path');
const fs = require ('fs');
const bcrypt = require('bcryptjs');

const {validationResult} = require('express-validator');

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');

const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const usuarioController={
    mostrarFormularioLogin: (req,res) => {return res.render ('login')},
    mostrarFormularioRegistroUsuario: (req,res) => {return res.render ('register')},

    mostrarFormularioModificarUsuario: (req, res) => {
        const usuarioId = req.params.id;       
        const usuarioAMostrar = usuarios.find((user) => user.id == usuarioId);
        if (usuarioAMostrar == undefined) {return res.render('not-found')};
        //en la vista hay que referirse a "usuario" como el objeto que contiene los campos a mostrar
        const viewData = {usuario: usuarioAMostrar};
        return res.render('editarUsuario', viewData);
    },

    almacenarNuevoUsuario: (req,res) => {
        
        const nuevoUsuario = req.body;
      
        //asignanción del id al nuevo usuario, una mas que el último id
        const largoBD = usuarios.length;
        nuevoUsuario.id = (usuarios[largoBD - 1].id)+1;

        nuevoUsuario.password = bcrypt.hashSync(req.body.password, 10);

        usuarios.push(nuevoUsuario);

        fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));

        return res.redirect('/');                  
    }, 

    almacenaUsuarioModificado: (req, res) => {
        //lógica para almacenar modificacion de usuario

        
        const usuarioIndex=  usuarios.findIndex(
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

        if (req.body.password != ""){ 
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

    borrarUsuario: (req,res) => {

      const newUsuarios = usuarios.filter((user) => user.id != req.params.id);
        
      fs.writeFileSync(usuariosFilePath, JSON.stringify(newUsuarios, null, 2));

      return res.redirect('/');
    },

    mostrarVistaLoginOk: (req, res) => {
      //lógica para controlar los valores ingresados contra los de la BD
      // si el usuario existe y el password es el correcto entones mostrar vista indexLoginOk

      const usuarioIndex=  usuarios.findIndex(
          (user) => {
          return user.email == req.body.email
      })
      if (usuarioIndex == -1) {
        return res.render('usuarioNotFound')
      }
      let check = bcrypt.compareSync(req.body.password, usuarios[usuarioIndex].password)
      if (check) {

        const productosRecomendados = products.filter(product => product.recomended=="true");
        const productosEnPromocion = products.filter(product=> product.discount >= 10)
        const viewData={
            productosRecomendados: productosRecomendados,
            productosEnPromocion: productosEnPromocion,
            usuario: usuarios[usuarioIndex]
        };
        return res.render('indexLoginOk', viewData);

      } else{
        return res.render('login');
      }
    
    }
}


module.exports = usuarioController