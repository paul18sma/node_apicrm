import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/database';
import  bcrypt  from "bcryptjs";

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
    hooks: {
        beforeSave: (user) => {
            // On create or update action, we check if the password changed.
            // With this control we avoid make a hash from the hash on update action
            // only if the password is absent. Otherwise we hash the password.
            if (user.changed('password')) {
                const salt = bcrypt.genSaltSync(10);
                const passwordDigest = bcrypt.hashSync(user.password, salt);
                user.password = passwordDigest;
            }
        }
    },
    tableName: 'users',
    timestamps: false,
    sequelize: sequelize, // this bit is important
});

export default User;