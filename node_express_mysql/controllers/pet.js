const Pets = require('../models/pets')

module.exports = (app) => {
    app.get('/pets', (req, res) => {

        Pets.lista((err, lista) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(lista)
            }
        })
    })
    app.post('/pets', (req, res) => {
        const body = req.body
        Pets.adicionar(body, (err, result) => {
            if (err) {
                res.status(500).json(err)
            } else {
                res.status(200).json(result)
            }
        })
    })
}