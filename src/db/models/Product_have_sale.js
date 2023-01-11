

module.exports=(sequilize, dataTypes)=>{

    let alias= "Products_has_sales";
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        product_id :{
            type: dataTypes.INTEGER
        },
        sales_id:{
            type:dataTypes.INTEGER
        },
        cantidad:{
           type: dataTypes.NUMBER
        }
    }
    let config= {
        tableName: "Products_has_sales",
        timestamps: true
    }

    const Product_have_sale = sequilize.define(alias,cols,config)



return Product_have_sale;
}