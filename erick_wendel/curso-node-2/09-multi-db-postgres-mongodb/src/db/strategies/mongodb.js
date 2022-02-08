const ICrud = require("./interface/iCrud");
const Mongoose = require('mongoose')

class MongoDB extends ICrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }

    connect() {
        return new Promise((resolve, reject) => {
            Mongoose.connect("mongodb://matheustorreao:minhasenhasecreta@localhost:27017/heroes", (error) => {
                if (error) {
                    console.error('Problema com a conexão ao mongodb', error)
                    reject()
                    return
                }
            })

            this._driver = Mongoose.connection

            this._driver.on('open', () => {
                console.log('Conexão bem sucedida ao mongodb');
                resolve()
                this.defineModel()
            })
        })
    }

    defineModel() {
        const heroisSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: Date,
                default: new Date()
            }
        })

        this._herois = Mongoose.model('herois', heroisSchema)
        console.log('Definindo models')
    }

    isConnected() {
        const connectionStatus = this._driver.readyState
        if (connectionStatus == Mongoose.STATES.connected)
            return true
        else
            return false
    }

    create(item) {
        console.log('O item foi salvo no MongoDB');
    }


}

module.exports = MongoDB