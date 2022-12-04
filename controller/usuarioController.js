const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');

const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));


const usuarioController={
    mostrarFormularioLogin: (req,res) => {return res.render ('login')},
    mostrarFormularioRegistroUsuario: (req,res) => {return res.render ('register')},
    mostrarFormularioModificarUsuario: (req, res) => {
        //lógica para mostrar formulario para modificar campos de un usuario pre-cargado
    },
    almacenarNuevoUsuario: (req,res) => {
        //logica para almacenar nuevo usuario
    },
    almacenaUsuarioModificado: (req, res) => {
        //lógica para almacenar modificacion de usuario
    },
    borrarUsuario: (req,res) => {
        //lógica para borrar usuario
    }
}


module.exports = usuarioController