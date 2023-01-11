
module.exports=(sequilize, dataTypes)=>{

    let alias= "Roles";
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
        tableName: "Roles",
        timestamps: true
    }

    const Role = sequelize.define(alias,cols,config)



return Role;
}