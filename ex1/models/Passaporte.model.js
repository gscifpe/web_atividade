const { DataTypes } = require('sequelize')
const sequelize = require ('../config/bd')

const Passaporte = sequelize.define('Passaporte',
    {
        numero:{
            type: DataTypes.STRING
        },
        validade:{
            type: DataTypes.DATE
        }
    },
    {
        tableName: 'Passaporte'
    }
)

module.exports = Passaporte