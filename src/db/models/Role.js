
module.exports=(sequilize, dataTypes)=>{

    let alias= "Roles";
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        nombre:{
            type: dataTypes.STRING
        }
    }
    let config= {
        tableName: "Roles",
        timestamps: true
    }

    const Role = sequilize.define(alias,cols,config)



return Role;
}