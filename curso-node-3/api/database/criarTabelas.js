const ModeloTabelaFornecedor = require('../rotas/fornecedores/ModeloTabelaFornecedor')

module.exports = {
    criar: () =>
        ModeloTabelaFornecedor
            .sync()
            .then(() => console.log("Tabela fornecedor criada/atualizada com sucesso!"))
            .catch(console.log)
}