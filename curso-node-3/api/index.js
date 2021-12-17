const config = require('config')
const express = require('express')

const app = express()
app.use(express.json())

// Criar tabelas
const tabelas = require('./database/criarTabelas')
// tabelas.criar()

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)

app.listen(config.get('api.port'), () => console.log('Servidor rodando na porta 3000'))