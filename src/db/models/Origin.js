
module.exports=(sequilize, dataTypes)=>{

    let alias= "Origin";
        //--- Definicion del modelo ---//
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        region:{
            type:dataTypes.STRING
        },
       
    }
    let config= {
        tableName: "Origins",
        timestamps: false
    }

    const Origin = sequilize.define(alias,cols,config)

//--- Relaciones de la Tablas ---//
Origin.associate=function(models){
    Origin.hasMany(models.Product,{
        foreignKey: 'origin_id',
        as:'product'
    })}

return Origin;
}
