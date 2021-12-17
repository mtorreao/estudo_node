const moment = require('moment')
const Atendimento = require('../models/atendimento')

module.exports = app => {
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.findById(id, (err, result) => {
            if (err) {
                res.status(500).send()
            } else if (result) {
                res.status(200).json(result)
            } else {
                res.status(404).send()
            }
        })
    })
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.deletar(id, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send()
            } else {
                res.status(200).send()
            }
        })
    })
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const body = req.body
        Atendimento.atualiza(id, body, (err, result) => {
            if (err) {
                res.status(500).send()
            } else {
                res.status(200).json(result)
            }
        })
    })
    app.get('/atendimentos', (req, res) => {

        Atendimento.listaTodos((result) => res.json(result))
    })
    app.post('/atendimentos', (req, res) => {
        const body = req.body
        console.log(body);

        const scheduledDate = body.data
        const isValidScheduledDate = scheduledDate && moment(scheduledDate).isSameOrAfter(new Date())

        const validacoes = [
            {
                name: 'Request',
                valid: body != 'undefined',
                message: "Request está num formato inválido"
            },
            {
                name: "data",
                valid: isValidScheduledDate,
                message: "Data de agendamento deve ser maior ou igual a hoje"
            }
        ]
        const errors = validacoes.filter(e => !e.valid)

        if (errors.length > 0) {
            res.status(400).json(errors)
        }
        else {
            Atendimento.adiciona(req.body)
            res.status(201).send()
        }

    })
}