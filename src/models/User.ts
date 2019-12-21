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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'name cannot be null'
            }
        }
    },
    email: {
        type: DataTypes.STRING(65),
        unique: true,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'email cannot be null'
            },
            isEmail: {                
                msg: 'must enter a valid email'
            }
        }
    },
    password: { 
        type: DataTypes.STRING(150),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'password cannot be null'
            },
            len: {
                args: [8, 60],
                msg: 'password must contain at least 8 chars'
            }
        }
    },
}, {
    tableName: 'users',
    timestamps: false,
    sequelize: sequelize, // this bit is important
})

export default User;