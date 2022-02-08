const ContextStrategy = require("./db/strategies/base/contextStrategy");
const MongoDB = require("./db/strategies/mongodb");
const PostGres = require("./db/strategies/postgres");

const contextMongoDb = new ContextStrategy(new MongoDB())
const contextPostgres = new ContextStrategy(new PostGres())

contextMongoDb.create({})
contextPostgres.create()