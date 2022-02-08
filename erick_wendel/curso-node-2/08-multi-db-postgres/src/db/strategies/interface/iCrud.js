class ICrud {
    isConnected() {
        throw new NotImplementedException()
    }

    create(item) {
        throw new NotImplementedException()
    }

    read(item) {
        throw new NotImplementedException()
    }

    update(id, data) {
        throw new NotImplementedException()
    }

    delete(id) {
        throw new NotImplementedException()
    }
}

class NotImplementedException extends Error {
    constructor() {
        super('Not implemented Exception')
    }
}

module.exports = ICrud