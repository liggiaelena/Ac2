const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const Exame = require('../models/exame');

router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const cliente = await Cliente.findOne({ _id: id });

        if (!cliente) {
            res.status(422).json({ mensagem: "Cliente não encontrado" });
            return;
        }

        const exames = await Exame.find({ clienteId: id });  

        res.status(200).json({cliente, exames});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    const { nome, idade, ra } = req.body;
    const cliente = {
        nome,
        idade,
        ra,
    }
    try {
        await Cliente.create(cliente);
        res.status(201).json(cliente);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao criar usuário', error });
    }
});


router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateFields = req.body;
        const updatedCliente = await Cliente.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedCliente) {
            return res.status(422).json({ mensagem: "Cliente não encontrado" });
        }
        res.status(200).json(updatedCliente);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao atualizar Cliente", erro: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        await Exame.deleteMany({ clienteId: id });  

        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        
        if (!cliente) {
            return res.status(422).json({ mensagem: "Cliente não encontrado" });
        }

        res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao excluir Cliente", erro: error.message });
    }
});

module.exports = router;