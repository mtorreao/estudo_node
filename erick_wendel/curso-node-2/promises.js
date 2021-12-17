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

function main() {
    obterPessoa()
        .then((pessoa) => {
            return obterTelefone(pessoa.id).then(telefone => { return { ...pessoa, ...telefone } })
        })
        .then(result => {
            return obterEndereco(result.id).then(endereco => { return { ...result, ...endereco } })
        })
        .then(console.log)
}

main()