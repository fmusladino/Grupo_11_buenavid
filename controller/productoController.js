const path = require ('path');
const fs = require ('fs');

const {validationResult} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productos.json');

const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const productoController={

    productDetail: (req,res) => {
        const productToEdit = products[0]
        return res.render ('productDetail', {product:productToEdit})
    },

    mostrarFormularioCargaProducto: (req, res) => {
        return res.render ('formCarga')
    },
    //crear: (req, res) => {
    //    return res.render ('formCarga')
    //},

    almacenaProducto: (req,res) => {
        
        const errors = validationResult(req);

        //return res.send(errors);

        
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

        
		return res.render('formCarga');
        
        
    },
    
    mostrarFormularioEdicionProducto: (req,res) => {
        const productId = req.params.id;       
        const productoAMostrar = products.find((product) => product.id == productId);
        if (productoAMostrar == undefined) {return res.send('El producto con Id: '+ productId +' buscado no existe')};
        //en la vista hay que referirse a "product" como el objeto que contiene los campos a mostrar
        const viewData = {product: productoAMostrar};
        return res.render('formEdicion', viewData);
    },

    almacenaProductoEditado: (req,res) => {
    }
    
    

}

module.exports= productoController