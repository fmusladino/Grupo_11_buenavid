module.exports=(sequilize, dataTypes)=>{

    let alias= "User";
     //--- Definicion del modelo ---//
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        rol_id:{
            type: dataTypes.INTEGER,
            onUpdate: 'NO ACTION',
            onDelete: 'RESTRICT'
        }
        ,
        first_name:{
            type:dataTypes.STRING
        },
        last_name:{

            type:dataTypes.STRING
        },
        cellphone:{
            type:dataTypes.NUMBER
        },
        date:{
        type:dataTypes.DATE
        },
        email:{
            type:dataTypes.STRING
        },
        password:{
            type:dataTypes.STRING
        }
    }
    let config= {
        tableName: "Users",
        timestamps: false
    }

    const User = sequilize.define(alias,cols,config)


    //--- Relaciones de la Tablas ---//
User.associate=function(models){
    User.belongsTo(models.Role,{
        foreignKey: 'rol_id',
        as:'role'
    })}

return User;
}
