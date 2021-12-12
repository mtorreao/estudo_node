const fs = require('fs')

fs.createReadStream('../assets/tigre.jpg')
    .pipe(fs.createWriteStream('../assets/tigre2.jpg'))
    .on('finish', () => {
        console.log('Imagem foi escrita com sucesso');
    })