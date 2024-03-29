const path = require('path');
const fs = require('fs');

const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const { Op } = require('sequelize');




//--Require de la base de datos--//
const db = require('../db/models')
const Product = db.Product
const Origin = db.Origin
const Category = db.Category




const productoController = {

    //-Detalle del producto--//
    productDetail: (req, res) => {
     Product.findByPk(req.params.productsId, {
            include: [{ association: "category" }, { association: "origin" }]
        })
            .then((productoSiSuIdExsiste) => {
                if(productoSiSuIdExsiste==null){
                    res.render('not-found')
                }
               const viewData={
                productoSiSuIdExsiste:productoSiSuIdExsiste,
               }
               if(req.session.userLogged){
                viewData.userLogged =req.session.userLogged
             }
                res.render('productDetail',viewData)
            }

             )},
            
            
      

    
    

         //--Formulario de Carga de producto vista--//
    mostrarFormularioCargaProducto: (req, res) => {
        //--Buscar Origin datos para mostrar en las vistas--//
     
      Origin.findAll()
      .then((origins) => {
     const viewData={
      origins
      }
 
        viewData.userLogged =req.session.userLogged
     
        return res.render('formCarga', viewData);
    })
        .catch(error => console.log(error));
    },



    //--Crear nuevo producto--//
    almacenaProducto: async (req, res) => {

        //--Validator--//
        const resultValidation = validationResult(req);
        const origins = await Origin.findAll()
        const category = await Category.findAll()
        
        if (resultValidation.errors.length > 0) {
            const viewData={
                errors: resultValidation.mapped(),
                valores: req.body,
                origins: origins,
                category: category}
  
                if(req.session.userLogged){
                    viewData.userLogged =req.session.userLogged
                }       
                
                return res.render('formCarga', viewData )
        }

        

        //--Variable que toma los datos del formulario--//
        let product = {
            category_id: req.body.category,
            description: req.body.description,
            winery: req.body.winery,
            origin_id: req.body.origin,
            year: req.body.year,
            price: req.body.price,
            discount: req.body.discount,
            image: req.file.filename,
            recomended: req.body.recomended
        }

        //--Mostrar a la vista--//

        Product.create(product)
            .then(() => {
                return res.redirect('/');
            })
            .catch(error => console.log(error));
    },



    //Funciona
    mostrarFormularioEdicionProducto: (req, res) => {
        const category = Category.findAll();
        const origen = Origin.findAll();
        const producto = Product.findByPk(req.params.id,{
         include:[{association:"category"}]
        });
    
        Promise.all([origen, category, producto])
        .then((resultado) => {
            if (resultado[2] == null) {
                res.render('productNotFound');
            }
    
            const viewData = {
                origins: resultado[0],
                category: resultado[1],
                valores: resultado[2],
            };
    
            if (req.session.userLogged) {
                viewData.userLogged = req.session.userLogged;
            }
    
            res.render('formEdicion', viewData);
        });
    },
    
    


  
    almacenaProductoEditado: async (req, res) => {
        const resultValidation = validationResult(req);
      
        if (resultValidation.errors.length > 0) {
          const origins = await Origin.findAll()
          const viewData= {
            errors: resultValidation.mapped(),
            valores: req.body,
            origins: origins
          }
      
          if(req.session.userLogged){
            viewData.userLogged =req.session.userLogged
          }       
      
          return res.render('formEdicion', viewData);
        }
      
        try {
          const producto = await Product.findByPk(req.params.id);
      
          if (req.file == undefined) {
            await producto.update({
              category_id: req.body.category,
              description: req.body.description,
              winery: req.body.winery,
              origin_id: req.body.origin,
              year: req.body.year,
              price: req.body.price,
              discount: req.body.discount,
              recomended: req.body.recomended,
            });
          } else {
            await producto.update({
              category_id: req.body.category,
              description: req.body.description,
              winery: req.body.winery,
              origin_id: req.body.origin,
              year: req.body.year,
              price: req.body.price,
              discount: req.body.discount,
              image: req.file.filename,
              recomended: req.body.recomended,
            });
          }
      
          res.redirect('/');
      
        } catch (error) {
          console.log(error);
        }
      },
    //Eliminar
    eliminarProducto: (req, res) => {

        Product.destroy(
            { where: { id: req.params.id } }
        )

        return res.redirect('/');
    },

    //--Vistas dinamicas finalizadas con Sequelize--//
    productosRosados: async (req, res) => {
        const productosCategoria = await Product.findAll({
            include: [{ association: 'category' }],
            where: { category_id: 3 }

        })

        const mostarEnconsola = {
            productosCategoria
        }
        if (req.session.userLogged) {
            mostarEnconsola.userLogged = req.session.userLogged
        }
        res.render('vinosCategorias', mostarEnconsola)
    },

    productosBlancos: async (req, res) => {
        const productosCategoria = await Product.findAll({
            include: [{ association: 'category' }],
            where: { category_id: 1 }
        })

        const mostarEnconsola = {
            productosCategoria
        }
        if (req.session.userLogged) {
            mostarEnconsola.userLogged = req.session.userLogged
        }
        res.render('vinosCategorias', mostarEnconsola)
    },

    productosTintos: async (req, res) => {
        const productosCategoria = await Product.findAll({
            include: [{ association: 'category' }],
            where: { category_id: 2 }
        })

        const mostarEnconsola = {
            productosCategoria
        }
        if (req.session.userLogged) {
            mostarEnconsola.userLogged = req.session.userLogged
        }
        res.render('vinosCategorias', mostarEnconsola)
    },

    productosEspumantes: async (req, res) => {
        const productosCategoria = await Product.findAll({
            include: [{ association: 'category' }],
            where: { category_id: 4 }
        })
        const mostarEnconsola = {
            productosCategoria
        }
        if (req.session.userLogged) {
            mostarEnconsola.userLogged = req.session.userLogged
        }
        res.render('vinosCategorias', mostarEnconsola)
    },
    
    productosEnPromo: async (req, res) => {
        const productosCategoria = await Product.findAll({
            where: {
                discount: {[Op.gte]: 10}
            }
        })
        const mostarEnconsola = {
            productosCategoria
        }
        if (req.session.userLogged) {
            mostarEnconsola.userLogged = req.session.userLogged
        }
        res.render('vinosCategorias', mostarEnconsola)
    },



    mostrarVistaDelBuscador:
    (req,res)=>{
        res.render('buscador')
    },

    search:
    (req,res)=>{
        const searchTerm = req.body.q
Product.findAll({
    where: {
        [Op.or]: [
          {
            description: {
              [Op.like]: `%${searchTerm}%`
            }
          },
          {
            winery: {
              [Op.like]: `%${searchTerm}%`
            }
          }
        ]
      },
      include: [
        {
          model: Category,
          as: 'category'
        }
      ]
    }).then((productos) => {
      const viewData={
        productos: productos,
      }
      if(req.session.userLogged){
        viewData.userLogged =req.session.userLogged
      }     
      if (productos.length === 0) {
        return res.render('not-found', viewData);
      }else{
        res.render('buscador', viewData);
      }
     
    }).catch((error) => {
      res.render('not-found');
    });
  }






}

module.exports = productoController