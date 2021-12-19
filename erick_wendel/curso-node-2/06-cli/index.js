const database = require('./database')

async function main() {
    const a = await database.obterDadosArquivo()

}
main()