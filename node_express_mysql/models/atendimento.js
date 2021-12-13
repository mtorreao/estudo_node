const moment = require('moment')
const axios = require('axios')
const conexao = require('../infra/mysqlConnector')

class Atendimento {
    adiciona(atendimento) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const insertModel = { ...atendimento, dataCriacao }

        const sql = 'INSERT INTO Atendimentos SET ?'

        console.log(insertModel);
        conexao.query(sql, insertModel, (error, resultados) => {
            if (error) {
                console.log(error);
                return
            }
            console.log('Atendimento criado com sucesso', resultados);
        })
    }

    listaTodos(callback) {
        const sql = 'SELECT * FROM Atendimentos'
        conexao.query(sql, (err, result) => {
            if (err) {
                console.log(err);
                return
            }

            callback(result)
        })
    }

    findById(id, callback) {
        const sql = `SELECT * FROM Atendimentos WHERE id = ?`

        conexao.query(sql, id, async (err, result) => {
            console.log('Encontrando atendimento por id', id, err, result);
            if (err) {
                console.log(err);
                callback(err, null)
            } else if (result.length > 0) {
                const atendimento = result[0]
                const response = await axios.default.get(`http://localhost:3001/clientes/${atendimento.cliente}`)
                atendimento.cliente = response.data

                callback(null, atendimento)
            } else {
                callback(null, null)
            }
        })
    }

    deletar(id, callback) {
        const sql = 'DELETE FROM Atendimentos WHERE id = ?'
        conexao.query(sql, id, (err, res) => {
            console.log('Deletando atendimento...', err, res);
            if (err) {
                callback(err)
            } else {
                callback(null)
            }
        })
    }

    atualiza(id, valores, callback) {
        const sql = 'UPDATE Atendimentos SET ? WHERE id = ?'
        conexao.query(sql, [valores, id], (err, result) => {
            console.log('Atualizando valores do atendimento...', id, valores, err, result);
            if (err) {
                callback(err, null)
            } else {
                callback(null, { ...valores, id })
            }
        })
    }
}

module.exports = new Atendimento