const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { Op } = require('sequelize')

const db =require("../db/models");
const Product=db.Product



const mainController = {

   index: (req,res) => {
      
      async function productosRecomendados () {
         try {
            productosRecomendados = await Product.findAll({ where:{
               recomended: true
            }},
            { limit: 9 })
            console.log("111111111111")
            console.log(productosRecomendados)
            console.log("111111111111")
            return productosRecomendados
         }
         catch(error) {console.log(error)}
      }
      async function productosEnPromocion () {
         try {  
            productosEnPromocion = await Product.findAll({where:{
            discount: {[Op.gte]: 10}
            }})
            console.log("222222222222")
            console.log(productosEnPromocion)
            console.log("222222222222")
            return productosEnPromocion
         }
         catch(error) {console.log(error)}
      }
      const viewData = {
         productosEnPromocion,
         productosRecomendados
      }
      if(req.session.userLogged){
         viewData.userLogged =req.session.userLogged
      }
    return res.render ('index',viewData)

   /*   Product.findAll({ where:{
         recomended: true
      }},
      { limit: 9 })
      .then( (data) => {
         productosRecomendados = data
         Product.findAll({where:{
            discount: {[Op.gte]: 10}
         }})
      })
      .then((dataDos)=>{
            productosEnPromocion = dataDos})
      .then ( () =>{
               const viewData = {
                  productosEnPromocion,
                  productosRecomendados
               }
               if(req.session.userLogged){
                  viewData.userLogged =req.session.userLogged
               }
             return res.render ('index',viewData)
            }
            )
         
      .catch(error => console.log(error));*/

   },

  productCar: (req, res) => {
      return res.render ('productCar')
   }
}

module.exports = mainController