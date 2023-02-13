const Category = require("./Category");

module.exports=(sequilize, dataTypes)=>{

    let alias= "Product";
     //--- Definicion del modelo ---//
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        description:{
            type: dataTypes.TEXT
        },
        year:{
            type:dataTypes.INTEGER
        },
        price:{
            type:dataTypes.FLOAT
        },
        discount:{
            type: dataTypes.STRING
        },
        recomended:{
            type: dataTypes.BOOLEAN
        },
        image:{
            type:dataTypes.STRING
        },
        winery:{
            type:dataTypes.STRING
        },
        category_id:{
            type:dataTypes.INTEGER
        },
        origin_id:{
            type:dataTypes.INTEGER
        }
    }
    let config= {
        tableName: "Products",
        timestamps: false
    }

    const Product = sequilize.define(alias,cols,config)
//--- Relaciones de la Tablas ---//
    Product.associate=function(models){
        Product.belongsTo(models.Category,{
            foreignKey: 'category_id',
            as:'category'
        });
        Product.belongsTo(models.Origin,{
            foreignKey:'origin_id',
            as:'origin'
        });
       
    }

return Product;
}

