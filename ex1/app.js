const sequelize = require('./config/bd')
const Pessoa = require('./models/Pessoa.model')
const Passaporte = require('./models/Passaporte.model')


async function conectarBD() {
  try {
    await sequelize.sync();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  } catch (erro) {
    console.error('Erro ao conectar:', erro);
  }
}

conectarBD()

app.listen(3000, () => {
    console.log('https://localhost:3000')
})