const roteador = require('express').Router()
const ModeloTabelaFornecedor = require('./ModeloTabelaFornecedor')

roteador.get('/', async (req, res) => {
    const fornecedores = await ModeloTabelaFornecedor.findAll()

    res.json(fornecedores)
})

roteador.post('/', async (req, res) => {
    const body = req.body
    var newAddedFornecedor = await new Fornecedor({ ...body }).criar()

    res.json(newAddedFornecedor)
})

module.exports = roteador

class Fornecedor {
    constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
        this.id = id
        this.email = email
        this.categoria = categoria
        this.dataCriacao = dataCriacao
        this.versao = versao
        this.dataAtualizacao = dataAtualizacao
        this.empresa = empresa
    }

    async criar() {
        const result = await ModeloTabelaFornecedor.create(this)

        return { ...this, id: result.dataValues.id }
    }
}