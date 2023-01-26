const Category = require("./Category");

module.exports=(sequilize, dataTypes)=>{

    let alias= "Products";
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
            type:dataTypes.DATE
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
        winery_id:{
            type:dataTypes.INTEGER
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
        timestamps: true
    }

    const Product = sequilize.define(alias,cols,config)



return Product;
}
//--- Relaciones de la Tablas ---//

Product.associate=function(models){
    Product.belongsTo(models.Categories,{
        foreignKey: 'category_id',
        as:'Categories'
    }),
    Product.belongsTo(models.Origins,{
        foreignKey:'origin_id',
        as:'Origins'
    }),
    Product.belongsTo(models.Wineries,{
        foreignKey:'winery_id',
        as:'Wineries'
    })
}
