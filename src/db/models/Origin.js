
module.exports=(sequilize, dataTypes)=>{

    let alias= "Origins";
    let cols={
        id: {
            autoIncrement: true,
            priemaryKey: true,
            type: DataTypes.INTEGER,
        },
        pais:{
            type: dataTypes.STRING
        },
        region:{
            type:DataTypes.STRING
        },
        zona:{
            type:DataTypes.STRING
        }
    }
    let config= {
        tableName: "Origins",
        timestamps: true
    }

    const Origin = sequelize.define(alias,cols,config)



return Origin;
}