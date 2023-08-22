const db = require('../models');
const Modality_user_tickets = db.Modality_user_tickets



async function createModalityUserTickets(req, res) {
    try {

        const { userTicketId, modalityId } = req.body;
        const newModality = await Modality_user_tickets.create({user_ticketId: userTicketId, modalityId: modalityId})

        res.status(201).json(newModality)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getAllModalitiesUserTickets(req, res) {
    try {

        const modality_user_tickets = await Modality_user_tickets.findAll()

        res.status(201).json(modality_user_tickets)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


async function getModalityUserTicketsById(req, res) {
    try {

        const { id } = req.params;
        const modalityUserTickets = await Modality_user_tickets.findByPk(id)

        res.status(201).json(modalityUserTickets)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function updateModalityUserTicketsById(req, res) {
    try {
        
        const { id } = req.params;

        const modalityUserTickets = await Modality_user_tickets.findByPk(id)

        if (!modalityUserTickets) {
            return res.status(404).json({ error: 'Modalidade de usuário não encontrado' });
        }


        const modalityUpdate = req.body;
        await Modality_user_tickets.update(modalityUpdate,
            {
                where: { id: modalityUserTickets.id }
            }
        )

        res.json({ message: "Modalidade de usuário atualizada com sucesso!" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function deleteModalityUserTicketsById(req, res) {
    try {
        const { id } = req.params;

        const modalityUserTickets = Modality_user_tickets.findByPk(id)

        if (!modalityUserTickets) {
            return res.status(404).json({ error: 'Modalidade de usuário não encontrado' });
        }

        await modalityUserTickets.destroy()

        res.json({ message: "Modalidade de usuário excluida com sucesso!" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



module.exports = {
    createModalityUserTickets,
    getAllModalitiesUserTickets,
    getModalityUserTicketsById,
    updateModalityUserTicketsById,
    deleteModalityUserTicketsById,
}

