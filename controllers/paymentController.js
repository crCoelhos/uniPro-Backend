const db = require('../models');
const Ticket = db.Ticket;
const Category = db.Category;
const User = db.User;
const User_ticket = db.User_ticket;
const mercadopago = require('mercadopago');
const MercadopagoService = require('../services/payment/mercadopagoService');
const CartaoService = require('../services/payment/cartaoService');
const Order = require('../models/order');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];


// levar por ticket controller (necessario)
async function bookTicket(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Token de autenticação não fornecido.' });
    }

    const decoded = jwt.verify(authHeader, config.secret);

    const categoryId = req.body
    const [category, user] = await Promise.all([
      Category.findByPk(categoryId.id),
      User.findByPk(decoded.id)
    ]);

    const qtTickets = await Ticket.count()
    if (qtTickets == category.quantity) {
      return res.status(301).json('Acabou os ingressos desse lote.');
    }

    const isUser_ticket = await User_ticket.findOne({
      where: {
        userId: user.id,
        status: 'confirmado'
      }
    });

    //console.log(isUser_ticket)
    if (isUser_ticket) {
      return res.status(301).json(`${user.name} já possui ingresso`);
    }

    const ticket = await Ticket.create({
      name: category.name,
      price: category.price,
      startDate: category.startDate,
      finishDate: category.finishDate,
      eventId: category.eventId,
    });

    const userTicket = await User_ticket.create({ userId: user.id, ticketId: ticket.id, status: 'processando' });

    res.json({ sessionId: session.id })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inicia o processo de comprar' });
  }
}

// necessario alteracoes, fazer ser por pix ou cartao.
async function Pay(req, res) {
  try {
    const { body } = req;
    const { payer, paymentMethod } = body;

    console.log(body.transaction_amount);

    if (!body.transaction_amount) {
      throw new Error("Valor inválido");
    }    
    const {
      token,
      payment_method_id,
      transaction_amount,
      description,
      installments,
      email,
    } = req.body;

    let paymentService;
    
    if (paymentMethod === 'pix') {
      paymentService = new PixService();
    } else if (paymentMethod === 'cartao') {
      paymentService = new CartaoService();
    } else {
      throw new Error('Metodo de pagamento invalido');
    }

    const { status, ...rest } = await paymentService.execute({
      token,
      payment_method_id,
      transaction_amount,
      description,
      installments,
      email
    });

    if (status !== 201) {
      throw new Error('Falha de pagamento!');
    }

    const data = await Order.create(rest);

    if (!data) {
      throw new Error('Falha ao salvar no banco!');
    }

    res.status(200).json({ status: 200, body: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


module.exports = {
  bookTicket,
  Pay
};