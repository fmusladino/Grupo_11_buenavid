
module.exports=(sequilize, dataTypes)=>{

    let alias= "Categories";
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
        timestamps: true
    }

    const Category = sequilize.define(alias,cols,config)



return Category;
}

//--- Relaciones de la Tablas ---//

Category.associate=function(models){
    Category.hasMany(models.Products,{
        foreignKey: 'category_id',
        as:'Products'
    })}
