
module.exports=(sequilize, dataTypes)=>{

    let alias= "Winery";
     //--- Definicion del modelo ---//
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombre:{
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "Wineries",
        timestamps: true
    }

    const Winery = sequilize.define(alias,cols,config)

//--- Relaciones de la Tablas ---//
Winery.associate=function(models){
    Winery.hasMany(models.Product,{
        foreignKey: 'winery_id',
        as:'product'
    })}

return Winery;
}

