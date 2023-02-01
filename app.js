//--Requires--//
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session=require('express-session');

//--Vistas--//
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
const publicPath = path.resolve('public');
app.use(express.static(publicPath));

//--Cookies--//
app.use(cookieParser());


//--Session--//
app.use(session({
    secret : 'Secret',
    resave : true,
    saveUninitialized : true
}));



//--Routers--//
const mainRouter = require('./src/routers/mainRouter')
const productoRouter= require('./src/routers/productoRouter')
const usuarioRouter=require('./src/routers/usuarioRouter')













//esta línea nos permite capturar la info que se envía desde un formulario con req.body
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride('_method'));




//Servidor ON

//Puerto
const app_port = process.env.PORT || 3000;

app.listen(app_port, ()=> {
console.log('Servidor en el puerto ' + app_port);
})




// Nos lleva a la pagina Home y Carrito
app.use('/', mainRouter);
// Nos lleva a la pagina Producto (edicion y carga)
app.use('/producto', productoRouter);
//Nos lleva a la pagina de Login y Registro
app.use('/usuario',usuarioRouter)



app.use((req, res, next)=>{
    res.status(404).render('not-found');
});