const express = require('express');
const app = express();
const mongoose = require('mongoose')

app.use(express.json());

const clienteController = require('./controllers/clienteControllers');
app.use('/clientes', clienteController);

const exameController = require('./controllers/exameControllers');
app.use('/exames', exameController);

mongoose.connect('mongodb://127.0.0.1:27017/banco_ac2')
    .then(() => {
        app.listen(27017, () => {
            console.log('Conectado ao mongoDB');
            console.log('Servidor iniciado na porta 27017');
        })
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(3000, () => console.log('Servidor rodando na porta: 3000'));