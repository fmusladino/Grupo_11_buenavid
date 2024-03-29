const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { Op } = require('sequelize')

const db =require("../db/models");
const Product=db.Product
const Role = db.Role



const mainController = {

   index: async (req,res) => {
      
      const productosRecomendados = await Product.findAll({ 
         limit: 9, 
         where:{recomended: true }
            })
//--Falta que sea Mayor a 10--//
      const productosEnPromocion = await Product.findAll({where:{
               discount: {[Op.gte]: 10}
               }})   
const viewData= {
   productosRecomendados, 
   productosEnPromocion,
}

               if(req.session.userLogged){
                  viewData.userLogged =req.session.userLogged
               }
             return res.render ('index',viewData)
         },
      
      

      

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


  productCar: (req, res) => {
      return res.render ('productCar')
   }
}

module.exports = mainController