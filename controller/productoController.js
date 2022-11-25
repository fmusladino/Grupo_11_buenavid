const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));





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
        

        const resultValidation = validationResult(req);

      if(resultValidation.errors.length > 0){
       return res.render('formCarga',{
           errors: resultValidation.mapped(),
          valores: req.body
       })
       }

        
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
      const productoIndex=  products.findIndex(
            (product) => {
              return product.id == req.params.id
            }
          )
          if (productoIndex == -1) {
            return res.send('El producto que busca no exsiste')
          }
          products[productoIndex] = {
            ...products[productoIndex],
            ...req.body
          }
          fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
      
          return res.send(products[productoIndex])
    },

    eliminarProducto:(req,res)=>{

    },

    productosRosados:(req,res)=>{
        const productosRosados= products.filter(product=>product.category=='Rosado')

        const mostarEnconsola={
            productosRosados
        }
        res.render('vinosRosados',mostarEnconsola)
    },
    productosBlancos:(req,res)=>{
        const productosBlancos= products.filter(product=>product.category=='Blanco')

        const mostarEnconsola={
            productosBlancos
        }
        res.render('vinosBlancos',mostarEnconsola)
    },
    productosTintos:(req,res)=>{
        const productosTintos= products.filter(product=>product.category=='Tinto')

        const mostarEnconsola={
            productosTintos
        }
        res.render('vinosTintos',mostarEnconsola)
    },
    productosEspumantes:(req,res)=>{
        const productosEspumantes= products.filter(product=>product.category=='Espumantes')

        const mostarEnconsola={
            productosEspumantes
        }
        res.render('vinosEspumantes',mostarEnconsola)
    }
    
    

}

module.exports= productoController