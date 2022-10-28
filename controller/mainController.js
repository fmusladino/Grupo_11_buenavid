const path = require ('path');

const controller = {
    index: (req,res) => {
        return res.sendFile (path.resolve('./views/index.html'))
    },
    login: (req,res) => {
        return res.sendFile (path.resolve('./views/login.html'))
    },
    productCard: (req,res) => {
        return res.sendFile (path.resolve('./views/productCard.html'))
    },
    productDetail: (req,res) => {
        return res.sendFile (path.resolve('./views/productDetail.html'))
    },
    register: (req,res) => {
        return res.sendFile (path.resolve('./views/register.html'))
    }

}

module.exports = {controller}