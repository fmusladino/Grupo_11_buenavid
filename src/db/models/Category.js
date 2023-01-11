
module.exports=(sequilize, dataTypes)=>{

    let alias= "Categories";
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
        tableName: "Categories",
        timestamps: true
    }

    const Category = sequilize.define(alias,cols,config)



return Category;
}