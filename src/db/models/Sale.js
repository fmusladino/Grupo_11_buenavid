
module.exports=(sequilize, dataTypes)=>{

    let alias= "Sales";
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        importe:{
            type: dataTypes.NUMBER
        },
        users_id:{
        type:dataTypes.INTEGER
        }
    }
    let config= {
        tableName: "Sales",
        timestamps: true
    }

    const Sale = sequilize.define(alias,cols,config)



return Sale;
}