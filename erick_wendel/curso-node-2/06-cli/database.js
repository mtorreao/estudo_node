const { readFile, writeFile } = require('fs')
const { promisify } = require('util')

const readFileAsync = promisify(readFile)
const writeFileAsync = promisify(writeFile)

Array.prototype.any = function (callback) {
    for (const element of this) {
        const resultCallback = callback(element, this)
        if (resultCallback === true) {
            return true
        }
    }
    return false
}
Array.prototype.indexOfWhere = function (callback) {
    for (const index in this) {
        if (Object.hasOwnProperty.call(this, index)) {
            const element = this[index];
            const result = callback(element, index, this)
            if (result === true)
                return index
        }
    }
    return -1
}

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json'
    }

    async obterDadosArquivo() {
        const fileBuffer = await readFileAsync(this.NOME_ARQUIVO)
        const dadosJson = JSON.parse(fileBuffer)
        return dadosJson
    }

    async escreverArquivo(herois) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(herois), 'utf8')
    }

    gerarNovoId(herois) {
        let id = new Date().getTime()
        if (!herois.any((el) => el.id == id))
            return id
        else
            this.gerarNovoId(herois)
    }

    async criarHeroi(heroi) {
        var heroisJaGravados = await this.obterDadosArquivo()
        const id = this.gerarNovoId(heroisJaGravados)
        heroisJaGravados.push({ ...heroi, id })
        await this.escreverArquivo(heroisJaGravados)
        return { ...heroi, id }
    }

    async atualizar(id, data) {
        var heroisJaGravados = await this.obterDadosArquivo()
        const index = heroisJaGravados.indexOfWhere((el) => el.id == id)
        if (index > -1) {
            heroisJaGravados[index] = { ...data, id }
            await this.escreverArquivo(heroisJaGravados)
        }
    }

    async listar(id) {
        const herois = await this.obterDadosArquivo()
        const heroisFiltrados = herois.filter((el) => id ? el.id == id : true)
        return heroisFiltrados
    }

    async deletar(id) {
        const herois = await this.obterDadosArquivo()
        const index = herois.indexOfWhere((el) => el.id == id)
        herois.splice(index, 1)
        await this.escreverArquivo(herois)
    }
}

module.exports = new Database()