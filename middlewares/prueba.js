//NO TOCAR EN UN FUTURO TENDRA USO

const pruebaMiddlewares=(req,res,next)=>{
console.log('Hola desde Middlewares')
next();
}
module.exports=pruebaMiddlewares