const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const {op}=require('sequelize')

const db =require("../db/models");
const Product=db.Product



const mainController = {
   

   index: (req,res) => {
        
      const productosRecomendados = Product.findAll().then( { where:{
         recomended: true
      }})
      .catch(error => console.log(error));
  
   

      const productosEnPromocion = Product.findAll()
         .then({where:{
            discount: {[op.gt]: 10}
         }})
         .catch(error => console.log(error));
  
     console.log(productosEnPromocion)

       const viewData={
          productosRecomendados,
         productosEnPromocion

    }
    if(req.session.userLogged){
      viewData.userLogged =req.session.userLogged
    }

    return res.render ('index',viewData )
   },

  productCar: (req,res) => {
      return res.render ('productCar')
   }
   
   
 }







module.exports = mainController