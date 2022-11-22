const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('./routers/mainRouter')
const productoRouter= require('./router/productoRouter')


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', mainRouter);
app.use('/producto', productoRouter);


const app_port = process.env.PORT || 3000;


//esta línea nos permite capturar la info que se envía desde un formulario con req.body
app.use(express.urlencoded({extended: false}));


app.use(express.json());




const publicPath = path.resolve('public');
app.use(express.static(publicPath));


app.listen(app_port, ()=> {
console.log('Servidor en el puerto ' + app_port);
})

app.use((req, res, next)=>{
    res.status(404).render('not-found');
});

