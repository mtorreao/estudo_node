const ICrud = require("../interface/iCrud")

class ContextStrategy extends ICrud {
    constructor(strategy) {
        super()
        this._database = strategy
    }

    create(item) {
        return this._database.create(item)
    }
    read(item) {
        return this._database.read(item)
    }
    update(item) {
        return this._database.update(item)
    }
    delete(item) {
        return this._database.delete(item)
    }
}

module.exports = ContextStrategy