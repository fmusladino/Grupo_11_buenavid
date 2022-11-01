const path = require ('path');

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
        return res.render (path.resolve('./views/productDetail.ejs'))
    },
    register: (req,res) => {
        return res.render (path.resolve('./views/register.ejs'))
    }

}

module.exports = {controller}