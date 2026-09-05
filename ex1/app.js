const sequelize = require('./config/bd')
const { Pessoa, Passaporte } = require('./models/ass');

const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs.engine({defaultLayout: false}));
app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }))
app.use(express.json());

app.get('/pessoas/cadastrar', (req, res) => {
    res.render('cadastrarPessoa');
});

app.post('/pessoas/cadastrar', async (req, res) => {

    try {

        const pessoa = await Pessoa.create({
            nome: req.body.nome
        });


    } catch (error) {

        console.log(error);
        res.status(500).send('Erro ao cadastrar pessoa');

    }

});

app.post('/pessoas/:id/passaporte/cadastrar', async (req, res) => {

    try {

        const id = req.params.id;

        const pessoa = await Pessoa.findByPk(id);

        const passaporte = await pessoa.createPassaporte({
            numero: req.body.numero,
            validade: req.body.validade
        });

        res.send(`
            <h1>Cadastro realizado!</h1>

            <p>Pessoa: ${pessoa.nome}</p>

            <p>Número do passaporte: ${passaporte.numero}</p>

            <p>Validade: ${passaporte.validade}</p>
        `);

    } catch (error) {

        console.log(error);
        res.status(500).send('Erro ao cadastrar passaporte');

    }

});

app.get('/pessoas', async (req, res) => {
    try {
        const pessoas = await Pessoa.findAll({
            include: {
                model: Passaporte,
                as: 'passaporte'
            }
        });

        res.render('listarPessoa', { pessoas });

    } catch (error) {
        console.log(error);
        res.status(500).send('Erro ao listar pessoas');
    }
});

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