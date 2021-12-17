function obterPessoa() {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            return resolve({
                id: 1,
                nome: "Alex",
                idade: 30,
                dataNascimento: new Date()
            })
        }, 300))
}

function obterEndereco(idPessoa) {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            return resolve({
                rua: "Rua Carlos Fernandes",
                cep: 52012303
            })
        }, 200))
}

function obterTelefone(idPessoa) {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            return resolve({
                ddd: 81,
                telefone: 2131244
            })
        }, 100))
}

async function main() {
    try {
        console.time('main')
        const pessoa = await obterPessoa()
        const telefone = await obterTelefone(pessoa.id)
        const endereco = await obterEndereco(pessoa.id)

        console.log({
            ...pessoa,
            ...telefone,
            ...endereco
        })
        console.timeEnd('main')
    } catch (err) {
        console.error('DEU RUIM', err)
    }
}

async function main2() {
    try {
        console.time('main2')
        const pessoa = await obterPessoa()

        const promises = await Promise.all([
            obterTelefone(pessoa.id),
            obterEndereco(pessoa.id)
        ])
        const telefone = promises[0]
        const endereco = promises[1]

        console.log({
            ...pessoa,
            ...telefone,
            ...endereco
        })
        console.timeEnd('main2')
    } catch (err) {
        console.error('DEU RUIM', err)
    }
}

main()
main2()