
module.exports=(sequilize, dataTypes)=>{

    let alias= "Roles";
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
        timestamps: true
    }

    const Role = sequilize.define(alias,cols,config)

    //--- Relaciones de la Tablas ---//
Role.associate=function(models){
    Role.hasMany(models.Users,{
        foreignKey: 'rol_id',
        as:'users'
    })}


return Role;
}
