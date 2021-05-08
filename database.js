const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_SCHEMA || 'postgres',
    'postgres',
    'postgres',
    {
        host: process.env.DB_HOST || '/cloudsql/faktura-312905:europe-north1:faktura-db',
        port: process.env.DB_PORT || 5432,
        dialect: 'postgres',
        dialectOptions: {
            ssl: process.env.DB_SSL == "true",
            socketPath: '/cloudsql/faktura-312905:europe-north1:faktura-db'
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
    postCode: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
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

const Invoices = sequelize.define('Invoices', {
    invoiceNumber: {
        type: Sequelize.INTEGER,
        allowNull: true
    },

    isDraft: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },

    customer: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    refTheirs: {
        type: Sequelize.STRING,
        allowNull: true
    },

    refOurs: {
        type: Sequelize.STRING,
        allowNull: true
    },

    product: {
        type: Sequelize.JSON,
        allowNull: true
    },

    netCost: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    taxTotal: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    subTotal: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    invoiceDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    dueDate: {
        type: Sequelize.DATEONLY,
        allowNull: true
    },
    paidAmount: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    commentInternal: {
        type: Sequelize.STRING,
        allowNull: true
    },
    commentExternal: {
        type: Sequelize.STRING,
        allowNull: true
    }
})
const Products = sequelize.define('Products', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    amountUnit: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    keepStock: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
    },
    netCost: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    netPrice: {
        type: Sequelize.FLOAT,
        allowNull: true
    },
    taxType: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
})
const AmountUnits = sequelize.define('AmountUnits', {
    short: {
        type: Sequelize.STRING,
        allowNull: false
    },
    long: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
const TaxTypes = sequelize.define('TaxTypes', {
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    percentage: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
})
module.exports = {
    sequelize: sequelize,
    Customer: Customer,
    Invoices: Invoices,
    Products: Products,
    AmountUnits: AmountUnits
}