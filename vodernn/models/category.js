import DataTypes from 'sequelize';
import sequelize from '../utils/database.js';

/** Model for Categories */
const Category = sequelize.define('Category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    }
});

export default Category;
