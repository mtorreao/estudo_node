const { ok, deepEqual, equal, notDeepEqual } = require('assert')
const { after } = require('mocha')
const database = require('./database')

const DEFAULT_HEROI_CADASTRAR = {
    nome: "Heroi Meleca",
    poder: "Super Meleca"
}

const DEFAULT_HEROI_ATUALIZAR = {
    id: new Date().getTime(),
    nome: "Heroi Covid",
    poder: "Super Covid"
}

const DEFAULT_HEROI_DELETAR = {
    id: new Date().getTime(),
    nome: "Heroi Meliante",
    poder: "Subtrair carteira"
}

describe('Database suite', () => {
    beforeEach(async () => {
        await database.escreverArquivo([DEFAULT_HEROI_ATUALIZAR, DEFAULT_HEROI_DELETAR])
    })

    // after(async () => {
    //     await database.escreverArquivo([])
    // })

    it('Escrever herois no arquivo', async () => {
        const expected = {
            id: 1,
            nome: 'Super Hello World'
        }
        await database.escreverArquivo([expected])
        var [result] = await database.listar(expected.id)
        deepEqual(result, expected)
    })

    it('Obter todos herois', async () => {
        const expected = DEFAULT_HEROI_CADASTRAR
        await database.escreverArquivo([expected])
        var results = await database.listar()

        deepEqual(results, [expected])
    })

    it('Cadastrar novo heroi', async () => {
        const expected = DEFAULT_HEROI_CADASTRAR
        const result = await database.criarHeroi(expected)

        deepEqual(result, { ...expected, id: result.id })
    })

    it('Atualizar heroi', async () => {
        const expected = DEFAULT_HEROI_ATUALIZAR
        const expectedId = expected.id
        delete expected.id
        await database.atualizar(expectedId, expected)
        const [result] = await database.listar(expected.id)
        deepEqual(result, { ...expected, id: expectedId })
    })

    it('Deletar heroi', async () => {
        const expected = DEFAULT_HEROI_DELETAR
        await database.deletar(expected.id)
        const [result] = await database.listar(expected.id)
        notDeepEqual(result, expected)
    })
})