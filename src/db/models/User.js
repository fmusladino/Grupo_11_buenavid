module.exports=(sequilize, dataTypes)=>{

    let alias= "Users";
     //--- Definicion del modelo ---//
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        rol_id:{
            type: dataTypes.INTEGER
        },
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
        timestamps: true
    }

    const User = sequilize.define(alias,cols,config)



return User;
}
//--- Relaciones de la Tablas ---//
User.associate=function(models){
    User.belongsTo(models.Roles,{
        foreignKey: 'rol_id',
        as:'roles'
    })}