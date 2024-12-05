import DataTypes from 'sequelize';
import sequelize from '../utils/database.js';

/** Model for Users */
const User = sequelize.define('User', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_type: {
        type: DataTypes.STRING,
        defaultValue: 'customer',
        validate: {
            isIn: {
                args: [['customer', 'seller', 'admin']],
                msg: "Invalid user type."
            }
        }
    }
});

export default User;