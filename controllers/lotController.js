const db = require('../models');
const { Op } = require('sequelize');
const Lot = db.Lot;
const Event = db.Event;
const Ticket = db.Ticket;


exports.createLot = async (req, res) => {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar lots.' });
        }

        const { lot } = req.body;


        const newLot = new Lot({ lot });
        res.status(201).json(newLot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getAllLots = async (req, res) => {
    try {

        const lots = await Lot.findAll({
            include: [{
                model: Event,
                as: 'event',
            }],
            attributes: {
                exclude: ['eventId'],
            }
        });
        
        res.status(200).json(lots);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}
exports.getLotById = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const lot = await Lot.findOne({
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
                lotId:lot.id,
                [Op.and]: {sold: false}
            }}),
            lot.countTicket()
          ]);
         
        
        res.status(200).json({lot, ticketsTotal, ticketsOpen});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateLotById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão editar lot.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const lotUpdate = await Lot.findByPk(id)
        if (!lotUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const lot = req.body;

        await Lot.update(lot, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteLotById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para deletar lots.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const lot = await Lot.findByPk(id)
        if (lot) {
            await lot.destroy()
            res.status(204).json({ message: 'Lot excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Lot não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

