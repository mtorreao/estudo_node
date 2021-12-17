const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callback) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(caminho)
    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) !== -1

    if (tipoEhValido) {
        callback('Tipo do arquivo é invalido', null)
    } else {
        const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('finish', () => {
                console.log('Imagem foi escrita com sucesso', caminho, novoCaminho);
                callback(null, novoCaminho)
            })
    }

}