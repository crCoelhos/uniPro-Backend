const db = require('../models');
const Ticket = db.Ticket;
const Category = db.Category;
const User = db.User;
const User_ticket = db.User_ticket;
const mercadopago = require('mercadopago');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

// Configurar o token de acesso do Mercado Pago
mercadopago.configurations.setAccessToken(config.mercadopago.access_token);

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

async function ProcessPayment(req, res) {
  try {
    const { body } = req;
    const { payer } = body;

    // Validate the input data
    if (!Number.isInteger(body.transactionAmount)) {
      throw new Error("Invalid transaction amount");
    }

    if (!body.token) {
      throw new Error("Missing token");
    }

    // Create the payment data
    const paymentData = {
      transaction_amount: body.transactionAmount,
      token: body.token,
      description: body.description,
      installments: body.installments,
      payment_method_id: body.paymentMethodId,
      issuer_id: body.issuerId,
      payer: {
        email: payer.email,
        identification: {
          type: payer.identification.docType,
          number: payer.identification.docNumber
        }
      }
    };

    // Call the Mercadopago API
    const response = await mercadopago.payment.save(paymentData);
    const { response: data } = response;

    // Check the status of the payment
    if (data.status === "approved") {
      res.status(201).json({
        detail: data.status_detail,
        status: data.status,
        id: data.id
      });
    } else {
      res.status(400).json({
        error_message: data.status_detail
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error_message: error.message
    });
  }
}

module.exports = {
  bookTicket,
  ProcessPayment
};