const FornecedorNaoEncontradoError = require('./rotas/fornecedores/FornecedorNaoEncontradoError')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')

app.use(bodyParser.json())
const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador)
app.use((err, req, res, next) => {
    console.log('Passando por esse middleware');

    if (err instanceof FornecedorNaoEncontradoError) {
        res.status(404).send(err.message)
    }

    next()
})


app.listen(config.get('api.porta'), () => console.log('A API está funcionando!'))