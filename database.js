const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    process.env.DB_USER || 'postgres',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DB_SSL == "true"
        }
    });

const Customer = sequelize.define('Customer', {
    isCompany: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    companyName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    orgNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

})
module.exports = {
    sequelize: sequelize,
    Customer: Customer
}