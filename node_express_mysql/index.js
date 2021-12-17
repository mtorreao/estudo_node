const custom_express = require("./config/custom_express")
const conexao = require('./infra/mysqlConnector')
const tabelas = require('./infra/tabelas')

conexao.connect(error => {
    if (error) {
        console.log(error)
        return
    }
    else console.log('Conectado ao banco de dados com sucesso');

    tabelas.init(conexao)
    const app = custom_express()

    app.listen(3000, () => console.log('App rodando na porta 3000'))
})
