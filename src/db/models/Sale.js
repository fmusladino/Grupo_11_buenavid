
module.exports=(sequilize, dataTypes)=>{

    let alias= "Sales";
    let cols={
        id: {
            autoIncrement: true,
            priemaryKey: true,
            type: DataTypes.INTEGER,
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

    const Sale = sequelize.define(alias,cols,config)



return Sale;
}