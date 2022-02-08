class ICrud {
    create(item) {
        throw new NotImplementedException()
    }

    read(item) {
        throw new NotImplementedException()
    }

    update(item) {
        throw new NotImplementedException()
    }

    delete(item) {
        throw new NotImplementedException()
    }
}

class NotImplementedException extends Error {
    constructor() {
        super('Not implemented Exception')
    }
}

module.exports = ICrud