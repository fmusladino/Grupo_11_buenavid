
module.exports=(sequilize, dataTypes)=>{

    let alias= "Products";
    let cols={
        id: {
            autoIncrement: true,
            priemaryKey: true,
            type: DataTypes.INTEGER,
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
            type:DataTypes.STRING
        },
        winery_id:{
            type:DataTypes.INTEGER
        },
        category_id:{
            type:DataTypes.INTEGER
        },
        origin_id:{
            type:DataTypes.INTEGER
        }
    }
    let config= {
        tableName: "Products",
        timestamps: true
    }

    const Product = sequelize.define(alias,cols,config)



return Product;
}