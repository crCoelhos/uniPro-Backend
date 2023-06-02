const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = require('../models');
const { Op } = require('sequelize');
const Ticket = db.Ticket;
const Category = db.Category;
const Event = db.Event;
const User = db.User;
const User_ticket = db.User_ticket;


exports.createTicket = async (req, res) => {
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


exports.getAllTickets = async (req, res) => {
    try {

        const tickets = await Ticket.findAll({
            include: [{
                model: Event,
                as: 'event',
            }],
        });
        res.status(200).json(tickets);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}
exports.getTicketById = async (req, res) => {
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

exports.updateTicketById = async (req, res) => {
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

exports.deleteTicketById = async (req, res) => {
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


exports.processTicket = async (req, res) => {

    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json('Acesso negado. Token não fornecido.');
    }

    try {
        const decoded = jwt.verify(authHeader, config.secret);

        const categoryId = req.body
        const [category, user] = await Promise.all([
            Category.findByPk(categoryId.id),
            User.findByPk(decoded.id)

        ])
        const qtTickets = await Ticket.count()
        if (qtTickets == category.quantity) {
            return res.status(301).json('Acabou os ingressos desse lote.');
        }
        const isUser_ticket = User_ticket.findOne({where:{
            userId:user.id,
            status: 'processando'
            // so para teste, em produção é 'status:"confimado"'
        }})
        console.log(isUser_ticket)
        if(isUser_ticket){
            return res.status(301).json(`${user.name} já possui ingresso`);
        }
        
        const ticket = await Ticket.create({
            name: category.name,
            price: category.price,
            startDate: category.startDate,
            finishDate: category.finishDate,
            eventId: category.eventId,
        })

        const user_ticket = await User_ticket.create({ userId: user.id, ticketId:ticket.id, status: 'processando'})

        res.json({message: "Continuar compra"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.buyTicket = async (req, res) => {
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

