const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const usuarioController={
    login: (req,res) => {
        return res.render ('login')
    },
    register: (req,res) => {
        return res.render ('register')
    }
}


module.exports = usuarioController