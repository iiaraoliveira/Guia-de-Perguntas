const express = require('express');
const cors = require('cors');
const app = express();
const connection = require("./database/database");
const Usuario = require('./database/Usuario');

app.use(express.json());
app.use(cors());


connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados")
    })
    .catch((msgError) => {
        console.log(msgError)
    })

app.post("/cadastro", (request, response) => {
    const { nome, email, senha } = request.body;

    Usuario.create({
        nome,
        email,
        senha
    })

    .then(usuario => response.status(201).json(usuario))
    .catch(error => response.status(500).json({ error: error.message }));
})

app.post('/login', async (request, response) => {
    const { email, senha } = request.body;

    try {
        const usuario = await Usuario.findOne({ where: { email } });

        if (usuario && usuario.senha === senha) {
            res.json({ authenticated: true });
        } else {
            res.status(401).json({ authenticated: false });
        }
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// Iniciar o servidor
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
