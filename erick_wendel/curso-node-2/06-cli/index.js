const { Command } = require('commander')
const database = require('./database')

const program = new Command()

program
    .version('0.0.1')
    .option('-d', 'Debug')

var commandCreate = program
    .command('create')
    .argument('<nome>', 'Nome do herói a ser criado')
    .argument('<poder>', 'Poder do herói a ser criado')
    .action(async (nome, poder) => {
        const novoHeroi = { nome, poder }
        console.log('heroi', novoHeroi);

        await database.criarHeroi(novoHeroi)
    })


program.parse(process.argv)