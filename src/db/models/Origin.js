
module.exports=(sequilize, dataTypes)=>{

    let alias= "Origins";
    let cols={
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER,
        },
        pais:{
            type: dataTypes.STRING
        },
        region:{
            type:dataTypes.STRING
        },
        zona:{
            type:dataTypes.STRING
        }
    }
    let config= {
        tableName: "Origins",
        timestamps: true
    }

    const Origin = sequilize.define(alias,cols,config)



return Origin;
}