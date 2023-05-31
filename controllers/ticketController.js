const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = require('../models');
const { Op } = require('sequelize');
const user_ticket = require('../models/user_ticket');
const Ticket = db.Ticket;
const Batch = db.Batch;
const User = db.User;
const User_ticket = db.User_ticket;


exports.createTicket = async (req, res) => {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar tickets.' });
        }
        const tickets = []
        const { ticket, quantidade}  = req.body;
        for( let i =0; i < quantidade; i++){
            let newTicket = await Ticket.create(ticket );
            tickets.push(newTicket)
        }

        res.status(201).json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getAllTickets = async (req, res) => {
    try {

        const tickets = await Ticket.findAll({
            include: [{
                model: Batch,
                as: 'batch',
            }],
            attributes: {
                exclude: [
                    'batchId',
                    'status',
                    'inProcessing'
                ],
            }
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
                model: Batch,
                as: 'batch',
                attributes: ['name']
            },
            {
                model: User,
                as: 'user',
                attributes: ['name', 'cpf']
            }],
            attributes: {
                exclude: ['batchId', 'sold', 'inProcessing']
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

        const ticket = req.body
       
        const batchId = await Batch.findOne({where:{name:ticket.batch}})
        const [isTicket, isUser] = await Promise.all([
            Ticket.findAll({
                where: {[Op.and]: [
                    {name: ticket.name} , { status: true }              
                ]},
                include:[{
                    model: Batch,
                    as:'batch'
                }]
                
            }),
            User.findByPk(decoded.id)

        ])
        console.log(isTicket)

        if (!isTicket) {
            return res.status(400).json({ error: 'Ticket inválido' });
        }
        // isTicket.inProcessing = confirm
        // isTicket.save()
        const token = jwt.sign({ ticketId: isTicket.id, userId: isUser.id }, config.secret, { expiresIn: '20m' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.buyTicket = async (req, res) => {
    // const confirmBuy  = req.body;
    // if(!confirmBuy){
    //     return res.status(400).json({ error: 'Compra não confirmada' });
    // }

    const confirmHeader = req.header('Confirm');
    if (!confirmHeader) {
        return res.status(401).json('Acesso negado. Token não fornecido.');
    }
    try {

        //decodifica o token do ticket que fez a requisição
        const decoded = jwt.verify(confirmHeader, config.secret);
        const [ticket, user] = await Promise.all([
            Ticket.findOne({
                where: { id: decoded.ticketId },
                sold: false,
                inProcessing: true
            }),
            User.findByPk(decoded.userId)

        ])

        ticket.sold = true;
        ticket.save();

        const user_ticket = await User_ticket.create({ userId: user.id, ticketId: ticket.id })
        res.status(201).json({ ticket, message: 'Compra realizada com sucesso' });
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Sua sessão expirou. Por favor, inicie a compra novamente.' });
        }
        res.status(401).json({ message: err.message });
    }
}

