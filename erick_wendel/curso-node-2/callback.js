function obterPessoa(callback) {
    setTimeout(() => {
        return callback(null, {
            id: 1,
            nome: "Alex",
            idade: 30,
            dataNascimento: new Date()
        })
    }, 300)
}

function obterEndereco(idPessoa, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: "Rua Carlos Fernandes",
            cep: 52012303
        })
    }, 200)
}

function obterTelefone(idPessoa, callback) {
    setTimeout(() => {
        return callback(null, {
            ddd: 81,
            telefone: 2131244
        })
    }, 100)
}

obterPessoa((error, pessoa) => {
    console.log('Pessoa obtida', pessoa);
    obterEndereco(pessoa.id, (error, endereco) => {
        console.log('Endereço foi obtido', endereco);
    })
    obterTelefone(pessoa.id, (error, telefone) => {
        console.log('Telefone foi obtido', telefone);
    })
})