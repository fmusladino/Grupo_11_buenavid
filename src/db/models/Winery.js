
module.exports=(sequilize, dataTypes)=>{

    let alias= "Wineries";
    let cols={
        id: {
            autoIncrement: true,
            priemaryKey: true,
            type: DataTypes.INTEGER,
        },
        nombre:{
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "Wineries",
        timestamps: true
    }

    const Winery = sequelize.define(alias,cols,config)



return Winery;
}