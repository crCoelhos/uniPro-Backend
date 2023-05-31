const db = require('../models');
const { Op } = require('sequelize');
const Batch = db.Batch;
const Event = db.Event;
const Ticket = db.Ticket;


exports.createBatch = async (req, res) => {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar batchs.' });
        }

        const  batch  = req.body;


        const newbatch = new Batch( batch );
        res.status(201).json(newbatch);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getAllBatchs = async (req, res) => {
    try {

        const batchs = await Batch.findAll({
            include: [{
                model: Event,
                as: 'event',
            }],
            attributes: {
                exclude: ['eventId'],
            }
        });
        
        res.status(200).json(batchs);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}
exports.getBatchById = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const batch = await Batch.findOne({
            where: { id: id },
            include: [{
                model: Event,
                as: 'event',
            }],
            attributes: {
                exclude: ['eventId'],
            }
        })
        const [ticketsOpen, ticketsTotal] = await Promise.all([
            Ticket.count({where:{
                batchId:batch.id,
                [Op.and]: {sold: false}
            }}),
            batch.countTicket()
          ]);
         
        
        res.status(200).json({batch, ticketsTotal, ticketsOpen});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateBatchById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão editar batch.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const batchUpdate = await Batch.findByPk(id)
        if (!batchUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const batch = req.body;

        await Batch.update(batch, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteBatchById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para deletar batchs.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const batch = await Batch.findByPk(id)
        if (batch) {
            await batch.destroy()
            res.status(204).json({ message: 'Batch excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Batch não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

