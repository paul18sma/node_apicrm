import { Sequelize, Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';

class User extends Model {
    public id!: number; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
    public email!: string;
    public password!: string;   
  
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
  


User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(40),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(65),
        allowNull: false,
        unique: true
    },
    password: { 
        type: DataTypes.STRING(150),
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: false,
    sequelize: sequelize, // this bit is important
})

export default User;