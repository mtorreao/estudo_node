const config = require('config')
const express = require('express')

const app = express()

app.use(express.json())

app.listen(config.get('api.port'), () => console.log('Servidor rodando na porta 3000'))