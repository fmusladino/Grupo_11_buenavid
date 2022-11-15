const path = require ('path');
const fs = require ('fs');
const products = JSON.parse (fs.readFileSync("./data/productos.json"));


const controller = {
    index: (req,res) => {
        return res.render ('index')
    },
    login: (req,res) => {
        return res.render ('login')
    },
    productCar: (req,res) => {
        return res.render ('productCar')
    },
    productDetail: (req,res) => {
        const productToEdit = products[0]
        return res.render ('productDetail', {product:productToEdit})
    },
    register: (req,res) => {
        return res.render ('register')
    },

    carga: (req,res) => {
        return res.render ('formCarga')
    },

    edicion: (req,res) => {
        return res.render ('formEdicion')
    },
  

}

module.exports = {controller}