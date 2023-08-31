const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const { Op } = require('sequelize');
const db = require('../models');
const Ticket = db.Ticket;
const Event = db.Event;
const User = db.User;
const User_ticket = db.User_ticket;
const Types_ticket = db.Types_ticket;

async function createTicket(req, res) {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar tickets.' });
        }
        const ticket = req.body;
        let newTicket = await Ticket.create(ticket);

        res.status(201).json(newTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getAllTickets(req, res) {
    try {

        const tickets = await Ticket.findAll({
            include: [{
                model: Event,
                as: 'event',
            },
            {
                model: Types_ticket,
                as: 'typeTicket',
            }
        ],
        });
        res.status(200).json(tickets);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

async function getTicketById(req, res) {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const ticket = await Ticket.findOne({
            where: { id: id },
            include: [{
                model: Event,
                as: 'event',
                attributes: ['name']
            },
            {
                model: User,
                as: 'user',
                attributes: ['name', 'cpf']
            }],
            attributes: {
                exclude: ['eventId']
            }
        })

        res.status(200).json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function updateTicketById(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão editar ticket.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const ticketUpdate = await Ticket.findByPk(id)
        if (!ticketUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const ticket = req.body;

        await Ticket.update(ticket, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function deleteTicketById(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para deletar tickets.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const ticket = await Ticket.findByPk(id)
        if (ticket) {
            await ticket.destroy()
            res.status(204).json({ message: 'Ticket excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Ticket não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function buyTicket(req, res) {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json('Acesso negado. Token não fornecido.');
    }

    try {
        const decoded = jwt.verify(authHeader, config.secret);

        console.log(req.body)
        const [user] = await Promise.all([
            User.findByPk(decoded.id)
        ])

        res.status(201).json({ message: 'Compra realizada com sucesso' });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Sua sessão expirou. Por favor, inicie a compra novamente.' });
        }
        res.status(401).json({ message: err.message });
    }
}

// TODO getTicketByUser
async function getTicketsByUser(req, res) {
    try {
        const userId = req.user.id;
        console.log('UserID:', userId);

        const userTickets = await User_ticket.findAll({
            where: { userId },
            include: [
                {
                    model: Ticket,
                    as: 'ticket',
                    include: [
                        {
                            model: Event,
                            as: 'event'
                        }
                    ]
                }
            ]
        });

        if (userTickets.length === 0) {
            return res.status(404).json({ message: 'Nenhum ingresso encontrado para esse usuarios.' });
        }

        res.status(200).json(userTickets);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: err.message });
    }
}


async function getUserTicketById(req, res) {
    try {
        const userTicket = req.params
        console.log(userTicket)
        const userTickets = await User_ticket.findByPk(userTicket.id);

        if (userTickets.length === 0) {
            return res.status(404).json({ message: 'Nenhum ingresso encontrado para esse usuarios.' });
        }

        res.status(200).json(userTickets);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: err.message });
    }
}

async function getUserTicketByCategoryAthletic(req, res) {
    try {
        const user = req.user
        const {categoryId, athleticId} = req.params
        const userTickets = await User_ticket.findOne({
            where:{
                userId: user.id,
                athleticId: athleticId,
                categoryId: categoryId
            }
        });


        res.status(200).json(userTickets);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: err.message });
    }
}

async function getTicketsByEventId(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar tickets.' });
        }

        const tickets = await User_ticket.findAll({
            where: {
                eventId: req.params.id, // Certifique-se de que "req.params.id" esteja correto
            },
        });

        return res.status(200).json(tickets); // Enviar a lista de ingressos como resposta
    } catch (error) {
        console.error('Erro ao obter os ingressos do evento:', error);
        return res.status(500).json({ error: 'Erro interno do servidor' });
    }
}


module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById,
    buyTicket,
    getTicketsByUser,
    getUserTicketById,
    getUserTicketByCategoryAthletic,
    getTicketsByEventId
}
