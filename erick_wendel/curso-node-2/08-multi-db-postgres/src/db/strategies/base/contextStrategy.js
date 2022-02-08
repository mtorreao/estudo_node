const ICrud = require("../interface/iCrud")

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    connect() {
        return this._database.connect()
    }

    async isConnected() {
        return await this._database.isConnected();
    }

    create(item) {
        return this._database.create(item)
    }
    read(item) {
        return this._database.read(item)
    }
    update(id, data) {
        return this._database.update(id, data)
    }
    delete(id) {
        return this._database.delete(id)
    }
}

module.exports = ContextStrategy