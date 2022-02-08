const ICrud = require("./interface/iCrud");

class PostGres extends ICrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('O item foi salvo no PostGres');
    }
}

module.exports = PostGres