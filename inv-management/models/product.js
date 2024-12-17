import DataTypes from 'sequelize';
import sequelize from '../utils/database.js';

/** Model for Products */
const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.REAL,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    seller_id: {
        type: DataTypes.INTEGER
    },
    category_id: {
        type: DataTypes.INTEGER
    }
},
    {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

export default Product;
