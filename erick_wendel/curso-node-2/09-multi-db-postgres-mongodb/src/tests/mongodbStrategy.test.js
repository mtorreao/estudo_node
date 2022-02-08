const ContextStrategy = require("../../../08-multi-db-postgres/src/db/strategies/base/contextStrategy");
const MongoDB = require("../db/strategies/mongodb");
const { equal, ok } = require('assert')

const context = new ContextStrategy(new MongoDB())

describe('Testes com mongodb', function () {
    this.beforeAll(async () => {
        await context.connect()
    })

    it.only('Testando conexao', async () => {
        const status = await context.isConnected()
        ok(status)
    })
})