const path=require('path');

const controller = {
    index: (req, res) => {
        return res.sendfile (path.resolve('./views/index.html'));
    },
    login: (req, res) => {
        return res.sendfile (path.resolve('./views/login.html'));
    },
    productDetail: (req, res) => {
        return res.sendfile (path.resolve('./views/productdetail.html'));
    },
    productCar: (req, res) => {
        return res.sendfile (path.resolve('./views/Productcar.html'));
    },

}

module.exports = {controller}