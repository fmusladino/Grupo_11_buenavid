const path = require('path');
const fs = require('fs');

const { validationResult } = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



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
                productoSiSuIdExsiste:productoSiSuIdExsiste
               }
               if(req.session.userLogged){
                viewData.userLogged =req.session.userLogged
             }
                res.render('productDetail',viewData)
            }

             )},
            
            
      

        /* const productoID=req.params.productsId
         const productoSiSuIdExsiste= products.find((product)=>product.id== productoID);
         if (productoSiSuIdExsiste == undefined) {
         return res.render("not-found");
         }
         return res.render("productDetail", {
             productoSiSuIdExsiste: productoSiSuIdExsiste,
         }); */
    

         //--Formulario de Carga de producto vista--//
    mostrarFormularioCargaProducto: (req, res) => {
        //--Buscar Origin datos para mostrar en las vistas--//

        Origin.findAll().then((origins) => {
            return res.render('formCarga', { origins: origins });
        })
            .catch(error => console.log(error));

    },



    //--Crear nuevo producto--//
    almacenaProducto: async (req, res) => {

        //--Validator--//
        const resultValidation = validationResult(req);



        if (resultValidation.errors.length > 0) {
            console.log('Entro aca')
            Origin.findAll().then((origins) => {
                return res.render('formCarga', {
                    errors: resultValidation.mapped(),
                    valores: req.body,
                    origins: origins
                })
            })
        }

        //--Logica con BD--//


        console.log(req.file)
        //--Variable que toma los datos del formulario--//
        let product = {
            category_id: req.body.category,
            description: req.body.description,
            winery: req.body.winery,
            origin_id: req.body.origin,
            year: req.body.year,
            price: req.body.price,
            discount: req.body.discount,
            image: req.filename,
            recomended: req.body.recomended
        }

        //--Mostrar a la vista--//
        



        Product.create(product)
            .then(() => {
                return res.redirect('/');
            });

    },







    //--LOGISTICA CON JSON--//


    // const nuevoProducto = req.body;

    //asignanción del id al nuevo producto, una mas que el último id
    //   const largoBD = products.length;
    // nuevoProducto.id = (products[largoBD - 1].id)+1;

    // pasar a numeros los string de precio y descuento que vengan del formulario
    //nuevoProducto.price = parseFloat(nuevoProducto.price);
    //  nuevoProducto.discount = parseFloat(nuevoProducto.discount);

    // agrego el campo con el nombre de la foto del producto que se guardó en public/images/products
    //  nuevoProducto.image = req.file.filename;

    //  products.push(nuevoProducto);

    //fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

    //return res.redirect('/');

    //},



    //Modificar-->Sequelize
    mostrarFormularioEdicionProducto: (req, res) => {
        
        const category=Category.findAll();
        const origen=Origin.findAll();
        const producto = Product.findByPk(req.params.id,{
         include:[{association:"category"}, {association:"origin"}]
        })

        Promise.all([origen, category, producto])
        .then((resultado)=>{
            if(resultado[2]==null){

                res.render('productNotFound')
            }
            const viewdata={
                origen:resultado[0],
                category:resultado[1],
                producto: resultado [2]
            }
            res.render('formEdicion', viewdata)
        })
    },


    //Modificar
    almacenaProductoEditado: (req, res) => {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('formEdicion', {
                errors: resultValidation.mapped(),
                product: {
                    price: req.body.price,
                    description: req.body.description,
                    winery: req.body.winery,
                    origin: req.body.origin,
                    year: req.body.year,
                    discount: req.body.discount,
                    id: req.params.id,
                    //agregados para ver si se soluciona la falta de imagen y category ante error en la edicion
                    image: req.body.image,
                    category: req.body.category
                }
            })
        }

        const productoIndex = Producto.findByPk(
            (product) => {
                return product.id == req.params.id
            })
        if (productoIndex == -1) {
            return res.send('El producto que busca no existe')
        } else {
            /*  const productoCampos = req.body
              productoCampos.price = parseFloat(productoCampos.price);
              productoCampos.discount = parseFloat(productoCampos.discount);*/

            Product[productoIndex] = {
                ...Product[productoIndex],
                ...req.body,
                image: req.file ? req.file.filename : req.body.image
            }
            fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

            //return res.send(products[productoIndex])
            return res.redirect('/');
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
    //--Falta que sean Mayor a 10--//
    productosEnPromo: async (req, res) => {
        const productosCategoria = await Product.findAll({
            where: {
                discount: 10
            }
        })
        const mostarEnconsola = {
            productosCategoria
        }
        if (req.session.userLogged) {
            mostarEnconsola.userLogged = req.session.userLogged
        }
        res.render('vinosCategorias', mostarEnconsola)
    }



}

module.exports = productoController