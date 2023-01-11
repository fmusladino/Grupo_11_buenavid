
module.exports=(sequilize, dataTypes)=>{

    let alias= "Wineries";
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
        tableName: "Wineries",
        timestamps: true
    }

    const Winery = sequilize.define(alias,cols,config)



return Winery;
}