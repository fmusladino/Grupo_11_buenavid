
module.exports=(sequilize, dataTypes)=>{

    let alias= "Categories";
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
        tableName: "Categories",
        timestamps: true
    }

    const Category = sequelize.define(alias,cols,config)



return Category;
}