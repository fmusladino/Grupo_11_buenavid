const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//const products = JSON.parse (fs.readFileSync("./data/productos.json"));


const mainController = {
    index: (req,res) => {
        return res.render ('index')
    },
    productCar: (req,res) => {
        return res.render ('productCar')
    }
   
}

module.exports = mainController