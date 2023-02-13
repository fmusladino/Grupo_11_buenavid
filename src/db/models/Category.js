
module.exports=(sequilize, dataTypes)=>{

    let alias= "Category";
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
        tableName: "Categories",
        timestamps: false
    }

    const Category = sequilize.define(alias,cols,config)

//--- Relaciones de la Tablas ---//

Category.associate=function(models){
    Category.hasMany(models.Product,{
        foreignKey: 'category_id',
        as:'product'
    })}

return Category;
}

