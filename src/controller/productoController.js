const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



//--Require de la base de datos--//
const db= require('../db/models')
const Product=db.Product




//Logica
const productoController={

    productDetail: (req,res) => {
        const productoID=req.params.productsId
        const productoSiSuIdExsiste= products.find((product)=>product.id== productoID);
        if (productoSiSuIdExsiste == undefined) {
        return res.render("not-found");
        }
        return res.render("productDetail", {
            productoSiSuIdExsiste: productoSiSuIdExsiste,
        });
    },

    mostrarFormularioCargaProducto: (req, res) => {
        return res.render ('formCarga')
    },
    

    almacenaProducto: (req,res) => {
        
//--Validator--//
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
        return res.render('formCarga',{
            errors: resultValidation.mapped(),
            valores: req.body
        })
        }

//--Logica con BD--(falta modificaciones en la vista)--> en proceso//

//let product={
    //category_id:req.body.category,
    //description:req.body.description,
    //winery:req.body.winery,
    //origin_id:req.body.origin,
    //year:req.body.year,
    //price:req.body.price,
    //discount:req.body.discount,
    //image:req.body.image,//Duda con Multer
  //  recomended:req.body.recomended
//}

//Product.create(product)
//.then(() => {
   // return res.redirect('/');
 // })
  //  .catch(error => console.log(error));


    //--LOGISTICA CON JSON--//
       const nuevoProducto = req.body;

         //asignanción del id al nuevo producto, una mas que el último id
        const largoBD = products.length;
        nuevoProducto.id = (products[largoBD - 1].id)+1;

        // pasar a numeros los string de precio y descuento que vengan del formulario
    nuevoProducto.price = parseFloat(nuevoProducto.price);
        nuevoProducto.discount = parseFloat(nuevoProducto.discount);

        // agrego el campo con el nombre de la foto del producto que se guardó en public/images/products
      nuevoProducto.image = req.file.filename;

        products.push(nuevoProducto);

        fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
 
		return res.redirect('/');
              
    },
    
    mostrarFormularioEdicionProducto: (req,res) => {
        const productId = req.params.id;       
        const productoAMostrar = products.find((product) => product.id == productId);
        if (productoAMostrar == undefined) {return res.render('not-found')};
        //en la vista hay que referirse a "product" como el objeto que contiene los campos a mostrar
        const viewData = {product: productoAMostrar};
        return res.render('formEdicion', viewData);
    },

    almacenaProductoEditado: (req,res) => {

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
         return res.render('formEdicion',{
            errors: resultValidation.mapped(),
            product: {
                price: req.body.price,
                description: req.body.description,
                winery: req.body.winery,
                origin: req.body.origin,
                year:req.body.year,
                discount:req.body.discount,
                id: req.params.id,
                //agregados para ver si se soluciona la falta de imagen y category ante error en la edicion
                image: req.body.image,
                category: req.body.category
            }
         })
        }

        const productoIndex=  products.findIndex(
            (product) => {
              return product.id == req.params.id
            }
          )
          if (productoIndex == -1) {
            return res.send('El producto que busca no existe')
          }

        const productoCampos=req.body
        productoCampos.price = parseFloat(productoCampos.price);
        productoCampos.discount = parseFloat(productoCampos.discount);

          products[productoIndex] = {
            ...products[productoIndex],
            ...req.body,
            image: req.file ? req.file.filename : req.body.image
          }
          fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      
          //return res.send(products[productoIndex])
          return res.redirect('/');
    },

    eliminarProducto:(req,res)=>{;
                
        const newProducts = products.filter((product) => product.id != req.params.id);
        
        fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, 2));
       
        return res.redirect('/');
    },

    productosRosados:(req,res)=>{
        const productosCategoria= products.filter(product=>product.category=='Vino Rosado')

        const mostarEnconsola={
            productosCategoria
        }
        res.render('vinosCategorias',mostarEnconsola)
    },
    productosBlancos:(req,res)=>{
        const productosCategoria= products.filter(product=>product.category=='Vino Blanco')

        const mostarEnconsola={
            productosCategoria
        }
        res.render('vinosCategorias',mostarEnconsola)
    },
    productosTintos:(req,res)=>{
        const productosCategoria= products.filter(product=>product.category=='Vino Tinto')

        const mostarEnconsola={
            productosCategoria
        }
        res.render('vinosCategorias',mostarEnconsola)
    },
    productosEspumantes:(req,res)=>{
        const productosCategoria= products.filter(product=>product.category=='Vino Espumantes')

        const mostarEnconsola={
            productosCategoria
        }
        res.render('vinosCategorias',mostarEnconsola)
    },
    productosEnPromo:(req,res)=>{
        const productosCategoria= products.filter(product=>product.discount>0)
        const mostarEnconsola={
            productosCategoria
        }
        res.render('vinosCategorias',mostarEnconsola)
    }
    
    

}

module.exports= productoController