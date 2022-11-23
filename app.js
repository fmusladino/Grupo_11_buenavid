const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('./routers/mainRouter')
const productoRouter= require('./routers/productoRouter')
const usuarioRouter=require('./routers/usuarioRouter')



app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
const publicPath = path.resolve('public');
app.use(express.static(publicPath));





const app_port = process.env.PORT || 3000;


//esta línea nos permite capturar la info que se envía desde un formulario con req.body
app.use(express.urlencoded({extended: false}));


app.use(express.json());





app.listen(app_port, ()=> {
console.log('Servidor en el puerto ' + app_port);
})

//app.use((req, res, next)=>{
    //res.status(404).render('not-found');
//});


// Nos lleva a la pagina Home y Carrito
app.use('/', mainRouter);
// Nos lleva a la pagina Producto (edicion y carga)
app.use('/producto', productoRouter);
//Nos lleva a la pagina de Login y Registro
app.use('/usuario',usuarioRouter)

