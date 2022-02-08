const { equal, deepEqual } = require('assert')
const PostGres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')
const { assert } = require('console')

const context = new Context(new PostGres())

const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao negro', poder: 'flechas' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'dinheiro' }

describe('Postgres Strategy', function () {
    this.timeout(Infinity)

    this.beforeAll(async () => {
        await context.connect()
    })

    this.afterAll(async () => {
        const listC = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        const listA = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        const list = listC.concat(listA)
        console.log(list);
        list.forEach(item => {
            context.delete(item.id)
        });
    })

    it('Postgres Connection', async () => {
        const result = await context.isConnected()
        equal(result, true)
    })

    it('Cadastrar', async () => {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        deepEqual(result, MOCK_HEROI_CADASTRAR)
    })

    it('listar', async () => {
        const [first] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete first.id
        deepEqual(first, MOCK_HEROI_CADASTRAR)
    })

    it('atualizar', async () => {
        const [first] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        await context.update(first.id, MOCK_HEROI_ATUALIZAR)
        const [result] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
        delete result.id
        deepEqual(result, MOCK_HEROI_ATUALIZAR)
    })

    it('deletar', async () => {
        const created = await context.create(MOCK_HEROI_CADASTRAR)
        await context.delete(created.id)
        const [first] = await context.read({ id: created.id })
        deepEqual(first, null)
    })
})