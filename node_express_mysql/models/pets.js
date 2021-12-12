const conexao = require('../infra/mysqlConnector')
const uploadDeArquivo = require('../arquivos/uploadDeArquivos')

class Pets {
    adicionar(pet, callback) {
        uploadDeArquivo(pet.imagem, pet.nome, (err, novoArquivo) => {
            if (err) {
                callback(err, null)
            } else {
                const novoPet = { ...pet, imagem: novoArquivo }
                const sql = `INSERT INTO Pets SET ?`
                conexao.query(sql, novoPet, (err, result) => {
                    console.log('Inserindo um novo pet...', pet, err, result);
                    if (err) {
                        callback(err, null)
                    } else {
                        callback(null, { ...novoPet, id: result.insertId })
                    }
                })
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