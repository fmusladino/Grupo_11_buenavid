const express = require('express');
const path = require('path');
const app = express();
const publicPath = path.resolve('public');
app.use(express.static(publicPath));
const app_port = 3000;
app.listen(app_port, ()=> {
console.log('Servidor en el puerto ' + app_port);
})

app.get('/', (req,res) => {
    res.sendFile(path.resolve('views/index.html'))
})
