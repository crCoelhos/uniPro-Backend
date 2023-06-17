
const db = require('../models');
const Types_ticket = db.Types_ticket;

async function createTypeTicket (req, res) {
    try {
        const typeTicket = req.body;

        const newTypeTicket = await Types_ticket.create(typeTicket);

        res.status(201).json(newTypeTicket);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

async function getAllTypeTickets (req, res) {
    try {

        const typeTickets = await Types_ticket.findAll();

        res.status(200).json(typeTickets);
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}

async function getTypeTicketById (req, res) {
    try {

        const typeTicketId = req.params.id 

        const typeTicket = await Types_ticket.findOne({
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

        const updateTypeTicket = await Types_ticket.findByPk(typeTicketId);

        if (!updateTypeTicket) {
            res.json({ message: 'Tipo de ingresso não encontrado' })

        }

        const typeTicket = await Types_ticket.update(updateTypeTicket, {
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

        const typeTicket = await Types_ticket.findByPk(typeTicketId);

        if (!typeTicket) {
            res.json({ message: 'Tipo de ingresso não encontrado' })
        }
        typeTicket.status = false
        
        typeTicket.save()
        
        res.status(201).json({message: "Deletado com sucesso"});
    } catch (err) {
        res.status(500).json({message:err.message})
    }
}





module.exports = {
    createTypeTicket,
    getAllTypeTickets,
    getTypeTicketById,
    updateTypeTicketById,
    deleteTypeTicket
}