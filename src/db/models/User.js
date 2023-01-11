module.exports=(sequilize, dataTypes)=>{

    let alias= "Users";
    let cols={
        id: {
            autoIncrement: true,
            priemaryKey: true,
            type: DataTypes.INTEGER,
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

    const User = sequelize.define(alias,cols,config)



return User;
}