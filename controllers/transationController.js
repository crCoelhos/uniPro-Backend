const db = require('../models');
const Transation = db.Transation;

async function createTransation(req, res) {
    try {
        const transation = req.body;
        const newTransation = await Transation.create(transation);

        res.status(201).json(newTransation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getAllTransations(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para ver as transações.' });
        }

        const transations = await Transation.findAll();

        res.status(200).json(transations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    createTransation,
    getAllTransations
};
