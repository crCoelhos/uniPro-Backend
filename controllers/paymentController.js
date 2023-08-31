const { Op } = require('sequelize');
const db = require('../models');
const Ticket = db.Ticket;
const Category = db.Category;
const User = db.User;
const User_ticket = db.User_ticket;
const Athletic = db.Athletic;
const Transation = db.Transation;
const Coupon = db.Coupon
const axios = require('axios')
const mercadopago = require('mercadopago');
const statusMappings = require('../utils/paymentStatusMappings');

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

    const { categoryId, athleticId } = req.body
    console.log(req.body)
    console.log(req.body)
    const [category, user, athletic] = await Promise.all([
      Category.findByPk(categoryId),
      User.findByPk(decoded.id),
      Athletic.findByPk(athleticId)

    ]);
    console.log(athletic)
    const qtTickets = await User_ticket.findAll({
      where: {
        status: {
          [Op.or]: [
            'confirmado',
            'aguardando',
            'processando',
          ]
        }
      }
    })
    
    if (qtTickets.length == category.quantity) {
      return res.status(301).json('Acabou os ingressos desse lote.');
    }
    //Verificação se o usuario ja possui processo de compra de ingresso
    const isUser_ticket = await User_ticket.findOne({
      where: {
        userId: user.id,
        status: {
          [Op.or]: [
            'confirmado',
            // 'aguardando',
            'processando',
          ]
        },
        eventId: category.eventId
      }
    });
    // se o usuario ja possui processo em andamento ou confirmado a compra ele nao pode comprar mais daquele evento
    if (isUser_ticket && !category.pre) {
      // return res.status(301).json(`${user.name} já possui ingresso`);
    }
    //Criação do ingresso
    const ticket = await Ticket.create({
      name: category.name,
      price: category.price,
      startDate: category.startDate,
      finishDate: category.finishDate,
      typeTicketId: category.typeTicketId,
      eventId: category.eventId,
      pre: category.pre,
    });
    //associação do ingresso com o usuario
    const userTicket = await User_ticket.create({ userId: user.id, ticketId: ticket.id, eventId: category.eventId, categoryId:category.id, athleticId: athletic.id, status: 'aguardando' });
    setTimeout(async ()=>{
      verifyUserTicket = await User_ticket.findByPk(userTicket.id)
      if (verifyUserTicket.status === "aguardando"){
        verifyUserTicket.destroy()
      }
    }, 300000)
    //todo setinterval (de aguardando, passou 20 apenas os aguardando vai para expirando)
    res.json(userTicket)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao inicia o processo de comprar' });
  }
}
// função aqui

// necessario alteracoes, fazer ser por pix ou cartao.
async function Pay(req, res) {
  try {
    mercadopago.configurations.setAccessToken(config.mercadopago.access_token);

    const { body } = req;
    const { payer } = body;

    console.log(body)

    let discountAmount = 0;
    if (body.coupon) {
      const coupon = await Coupon.findOne({
        where: {
          code: body.coupon,
        },
      });

      if (coupon) {
        if (coupon.type === 'value') {
          discountAmount = coupon.amount;
        } else if (coupon.type === 'percentage') {
          discountAmount = (body.transaction_amount * coupon.amount) / 100;
        }
      }
    }

    const finalTransactionAmount = body.transaction_amount - discountAmount;

    var paymentData = {}
    if (body.payment_method_id === 'pix') {
      paymentData = {
        transaction_amount: finalTransactionAmount,
        description: body.description,
        payment_method_id: body.payment_method_id,
        // notification_url: body.notification_url,
        payer: {
          email: payer.email,
          first_name: payer.first_name,
          last_name: payer.last_name,
          identification: {
            type: payer.identification.type,
            number: payer.identification.number
          },
          address: {
            zip_code: payer.address.zip_code,
            street_name: payer.address.street_name,
            street_number: payer.address.street_number,
            neighborhood: payer.address.neighborhood,
            city: payer.address.city,
            federal_unit: payer.address.federal_unit
          }
        }
      };


      const response = await mercadopago.payment.create(paymentData);
      const { response: data } = response;
      const { point_of_interaction } = data

      // const notification_url = body.notification_url.split("/");
      // const user_ticketId = notification_url[notification_url.length - 1]
      // const transationId = data.id

      // const transation = await Transation.create({ user_ticketId, transationId })

      res.status(201).json({
        pix_id: data.id,
        pix_status: data.status,
        pix_status_details: data.status_detail,
        pix_qr_code: point_of_interaction.transaction_data
      });
    } else {
      paymentData = {
        transaction_amount: Number(finalTransactionAmount),
        token: body.token,
        description: body.description,
        installments: Number(body.installments),
        payment_method_id: body.payment_method_id,
        issuer_id: body.issuerId,
        // notification_url: body.notification_url,
        payer: {
          email: payer.email,
          identification: {
            type: payer.identification.docType,
            number: payer.identification.docNumber
          }
        }
      };
      console.log(mercadopago.payment)
      const response = await mercadopago.payment.save(paymentData);
      const { response: data } = response;
      // const notification_url = body.notification_url.split("/");
      // const user_ticketId = notification_url[notification_url.length - 1]
      // const transationId = data.id

      // const transation = await Transation.create({ user_ticketId, transationId })
      res.status(201).json({
        pay_status_detail: data.status_detail,
        pay_status: data.status,
        pay_id: data.id,
      });
    }
    // console.log(paymentData)

    // teste
    // 4509 9535 6623 3704
    // APRO 
    // 11/25

  } catch (error) {
    console.log(error);
    const { errorMessage, errorStatus } = ValidationErrorItemOrigin(error);
    res.status(errorStatus).json({ error_message: errorMessage });
  }
}

async function Webhook(req, res) {
  try {
    const data = req.body;

    if (data.action === 'payment.created') {
      const paymentId = data.data.id;
      const userId = data.user_id;
    }

    const transation = await Transation.findOne({
      where: {
        transationId: data.data.id
      }
    })

    if (data.action === 'payment.update') {
      try {
        const paymentId = data.data.id;
        const access_token = config.mercadopago.access_token;

        const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        const paymentStatus = response.data.status;
        console.log(`Status do pagamento ${paymentId}: ${paymentStatus}`);

        const transation = await Transation.findOne({
          where: {
            transationId: paymentId
          }
        });

        if (transation) {
          const userTicketId = transation.user_ticketId;
          const userTicket = await User_ticket.findByPk(userTicketId);

          if (userTicket) {
            const newStatus = statusMappings[paymentStatus];
            if (newStatus) {
              userTicket.status = newStatus;
              await userTicket.save();
              console.log(`Status do user_ticket ${userTicketId} atualizado para ${newStatus}.`);
            } else {
              console.log(`Mapeamento de status não encontrado para ${paymentStatus}.`);
            }
          }
        }

        res.status(200).send('Notificação recebida e processada com sucesso.');
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
        res.status(500).send('Erro ao processar notificação de pagamento.');
      }
    } else {
      res.status(400).send('Ação não reconhecida.');
    }
  } catch (error) {
    console.error('Erro geral:', error);
    res.status(500).send('Erro geral.');
  }
}

module.exports = {
  bookTicket,
  Pay,
  Webhook,
};