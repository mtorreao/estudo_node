const ICrud = require("./interface/iCrud");
const Sequelize = require('sequelize')

class PostGres extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }

    async isConnected() {
        try {
            await this._driver.authenticate()
            return true
        } catch (error) {
            console.error(error)
            return false
        }
    }

    async create(item) {
        return (await this._herois.create(item)).dataValues
    }

    read(item = {}) {
        return this._herois.findAll({ where: item, raw: true })
    }

    update(id, data) {
        return this._herois.update(data, {
            where: { id: id }
        })
    }

    delete(id) {
        return this._herois.destroy({ where: { id } })
    }

    async connect() {
        this._driver = new Sequelize(
            'heroes',
            'admin',
            'minhasenhasecreta',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                // operatorsAliases: {}
            }
        )

        await this._defineModel()
    }

    async _defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            },
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })

        await this._herois.sync()
    }
}

module.exports = PostGres