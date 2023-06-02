const db = require('../models');
const Ticket = db.Ticket;
const Category = db.Category;
const User = db.User;
const User_ticket = db.User_ticket;
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const stripe = require('stripe')(process.env.STRIPE);


async function processTicket(req, res) {
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
        status: 'processando'
        // so para teste, em produção é 'status:"confirmado"'
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

    // Criacao da sessao de pagamento com o stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            unit_amount: category.price * 100, // Converter para centavos
            product_data: {
              name: category.name,
            },
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    await User_ticket.update({ status: 'aguardando' }, { where: { id: userTicket.id } });

    res.json({ sessionId: session.id })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inicia o processo de comprar' });
  }
}

module.exports = {
  processTicket
};