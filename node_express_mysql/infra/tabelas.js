class Tabelas {
    init(conexao) {
        console.log('Tabelas foram chamadas');
        this.conexao = conexao

        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        const sql = `
        CREATE TABLE IF NOT EXISTS Atendimentos (
            id INT NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(50) NOT NULL,
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            status VARCHAR(20) NOT NULL,
            observacoes TEXT,
            data DATETIME,
            dataCriacao DATETIME,
            PRIMARY KEY(id))`
        this.conexao.query(sql, error => {
            if (error) {
                console.log(error);
            }

        })
    }

    criarPets() {
        const sql = `CREATE TABLE IF NOT EXISTS Pets (
            id INT NOT NULL AUTO_INCREMENT,
            nome VARCHAR(50) NOT NULL,
            imagem VARCHAR(200) NOT NULL,
            PRIMARY KEY(id)
        )`

        this.conexao.query(sql, err => {
            if (err)
                console.log(err);
        })
    }
}

module.exports = new Tabelas