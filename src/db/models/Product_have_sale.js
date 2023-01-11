const Product_have_sale12 = require("./Product_have_sale12");

module.exports=(sequilize, dataTypes)=>{

    let alias= "Products_has_sales";
    let cols={
        id: {
            autoIncrement: true,
            priemaryKey: true,
            type: DataTypes.INTEGER,
        },
        product_id :{
            type: dataTypes.INTEGER
        },
        sales_id:{
            type:dataTypes.INTEGER
        },
        cantidad:{
           type: DataTypes.NUMBER
        }
    }
    let config= {
        tableName: "Products_has_sales",
        timestamps: true
    }

    const Product_have_sale = sequelize.define(alias,cols,config)



return Product_have_sale;
}