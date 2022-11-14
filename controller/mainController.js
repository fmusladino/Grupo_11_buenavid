const path = require ('path');
const fs = require ('fs');
const products = JSON.parse (fs.readFileSync("./data/productos.json"));


const controller = {
    index: (req,res) => {
        return res.render (path.resolve('./views/index.ejs'))
    },
    login: (req,res) => {
        return res.render (path.resolve('./views/login.ejs'))
    },
    productCar: (req,res) => {
        return res.render (path.resolve('./views/productCar.ejs'))
    },
    productDetail: (req,res) => {
        const productToEdit = products[0]
        return res.render ('productDetail', {product:productToEdit})
    },
    register: (req,res) => {
        return res.render (path.resolve('./views/register.ejs'))
    },

    carga: (req,res) => {
        return res.render (path.resolve('./views/formCarga.ejs'))
    },

    edicion: (req,res) => {
        return res.render (path.resolve('./views/formEdicion.ejs'))
    },
  

}

module.exports = {controller}