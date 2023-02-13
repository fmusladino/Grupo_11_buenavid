
module.exports=(sequilize, dataTypes)=>{

    let alias= "Role";
     //--- Definicion del modelo ---//
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
        timestamps: false
    }

    const Role = sequilize.define(alias,cols,config)

    //--- Relaciones de la Tablas ---//
Role.associate=function(models){
    Role.hasMany(models.User,{
        foreignKey: 'rol_id',
        as:'user'
    })}


return Role;
}
