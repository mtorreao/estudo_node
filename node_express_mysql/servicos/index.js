const express = require('express')
const faker = require('faker')
faker.setLocale('pt_BR')

const app = express()

app.get('/clientes/:cpf', (req, res) => {
    const cpf = req.params.cpf

    res.status(200).json({
        cpf,
        nome: `${faker.name.firstName()} ${faker.name.lastName()}`,
        cellphone: faker.phone.phoneNumber()
    })
})

app.listen(3001, () => {
    console.log('Serviço de clientes rodando na porta 3001');
})