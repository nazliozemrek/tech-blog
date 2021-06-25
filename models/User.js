const {Model,DataTypes} = require('sequelize');

const sequelize =require('../config/connection');
const bycrpt =require('bcrypt');

class User extends Model {
    checkPassword(loginPW){
        return bycrpt.compareSync(loginPW,this.password);
    }
}

User.init (
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true,
            autoIncrement:true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                len:[6]
            }
        }
    },
    {
        hooks:{
            async beforeCreate(newUser){
                newUser.password = await bycrpt.hash(newUser.password,10);
                return newUser;
            },
            async beforeUpdate(updateUser){
                updateUser.password = await bycrpt.hash(updateUser.password,10)
            }
        },
        sequelize,
        timestamps:false,
        freezeTableName:true,
        underscored:true,
        modelName:'user'
    }
)

module.exports = User;