
const db = require('../models');
const Type_tickets = db.Type_tickets;

async function createTypeTicket (req, res) {
    try {
        const typeTicket = req.body;

        const newTypeTicket = Type_tickets.create(typeTicket);

        res.status(201).json(newTypeTicket);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

async function getAllTypeTicket (req, res) {
    try {

        const typeTickets = Type_tickets.findAll();

        res.status(200).json(typeTickets);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

async function getTypeTicketById (req, res) {
    try {

        const typeTicketId = req.params.id 

        const typeTicket = Type_tickets.findOne({
            where:{id:typeTicketId}
        });

        res.status(200).json(typeTicket);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

async function updateTypeTicketById (req, res) {
    try {

        const typeTicketId = req.params.id 

        const updateTypeTicket = Type_tickets.findByPk(typeTicketId);

        if (!updateTypeTicket) {
            res.json({ message: 'Tipo de ingresso não encontrado' })

        }

        const typeTicket = Type_tickets.update(updateTypeTicket, {
            where: { id: typeTicketId }
        });

        res.status(201).json(typeTicket);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}


async function deleteTypeTicket (req, res) {
    try {

        const typeTicketId = req.params.id 

        const typeTicket = Type_tickets.findByPk(typeTicketId);

        if (!typeTicket) {
            res.json({ message: 'Tipo de ingresso não encontrado' })
        }
        typeTicket.status
        
        
        res.status(201).json({message: "Deletado com sucesso"});
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}





module.exports = {
    createTypeTicket,
    getAllTypeTicket,
    getTypeTicketById,
    updateTypeTicketById
}