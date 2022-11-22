const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const controller={
    productDetail: (req,res) => {
        const productToEdit = products[0]
        return res.render ('productDetail', {product:productToEdit})
    },
}

module.exports= {controller}