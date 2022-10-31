const path = require ('path');

const controller = {
    index: (req,res) => {
        return res.sendFile (path.resolve('./views/index.html'))
    },
    login: (req,res) => {
        return res.sendFile (path.resolve('./views/login.html'))
    },
    productCar: (req,res) => {
        return res.sendFile (path.resolve('./views/productCar.html'))
    },
    productDetail: (req,res) => {
        return res.sendFile (path.resolve('./views/productDetail.html'))
    },
    register: (req,res) => {
        return res.sendFile (path.resolve('./views/register.html'))
    }

}

module.exports = {controller}