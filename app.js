const express = require('express');
const app = express();
const path = require('path');

const mainRouter = require('./routers/mainRouter')


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', mainRouter);

const app_port = process.env.PORT || 3000;




const publicPath = path.resolve('public');
app.use(express.static(publicPath));


app.listen(app_port, ()=> {
console.log('Servidor en el puerto ' + app_port);
})

