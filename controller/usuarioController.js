const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');

const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


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
        const usuarioCampos=req.body
          usuarios[usuarioIndex] = {
            ...usuarios[usuarioIndex],
            ...req.body,
          }
          fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));

        return res.redirect('/');                  
    },
    borrarUsuario: (req,res) => {

      const newUsuarios = usuarios.filter((user) => user.id != req.params.id);
        
      fs.writeFileSync(usuariosFilePath, JSON.stringify(newUsuarios, null, 2));

      return res.redirect('/');
    }
}


module.exports = usuarioController