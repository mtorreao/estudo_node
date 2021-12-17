class FornecedorNaoEncontradoError extends Error {
    constructor() {
        super('Fornecedor não foi encontrado')
    }
}

module.exports = FornecedorNaoEncontradoError