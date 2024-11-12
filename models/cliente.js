const mongoose = require('mongoose');
const Cliente = mongoose.model('Cliente', {
    nome: String,
    idade: Number,
    ra: String,
});

module.exports = Cliente