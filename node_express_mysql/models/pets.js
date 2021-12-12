const conexao = require('../infra/mysqlConnector')

class Pets {
    adicionar(pet, callback) {
        const sql = `INSERT INTO Pets SET ?`
        conexao.query(sql, pet, (err, result) => {
            console.log('Inserindo um novo pet...', pet, err, result);
            if (err) {
                callback(err, null)
            } else {
                callback(null, { ...pet, id: result.insertId })
            }
        })
    }

    lista(callback) {
        const sql = `SELECT * FROM Pets`
        conexao.query(sql, (err, result) => {
            console.log('Listando todos os pets...', err, result);
            if (err) {
                callback(err, null)
            } else {
                callback(null, result)
            }
        })
    }
}

module.exports = new Pets()