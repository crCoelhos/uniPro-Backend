const { Op } = require('sequelize');
const db = require('../models');
const Ticket = db.Ticket;
const Category = db.Category;
const User = db.User;
const User_ticket = db.User_ticket;
const Athletic = db.Athletic;
const mercadopago = require('mercadopago');

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

    const {categoryId, athleticId } = req.body
    console.log(req.body)
    const [category, user, athletic] = await Promise.all([
      Category.findByPk(categoryId),
      User.findByPk(decoded.id),
      Athletic.findByPk(athleticId)

    ]);
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
            'aguardando',
            //  'processando',
          ]
        },
        eventId: category.eventId
      }
    });
    // se o usuario ja possui processo em andamento ou confirmado a compra ele nao pode comprar mais daquele evento
    if (isUser_ticket) {
      return res.status(301).json(`${user.name} já possui ingresso`);
    }
    //Criação do ingresso
    const ticket = await Ticket.create({
      name: category.name,
      price: category.price,
      startDate: category.startDate,
      finishDate: category.finishDate,
      typeTicketId:category.typeTicketId,
      eventId: category.eventId,
    });
    //associação do ingresso com o usuario
    const userTicket = await User_ticket.create({ userId: user.id, ticketId: ticket.id, eventId: category.eventId, athleticId:athletic.id, status: 'aguardando' });

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
    var paymentData = {}
    if (body.payment_method_id === 'pix') {
      paymentData = {
        transaction_amount: body.transaction_amount,
        description: body.description,
        payment_method_id: body.payment_method_id,
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
      const { response:data } = response;
      const { point_of_interaction } = data

      res.status(201).json({
        pix_id:data.id,
        pix_status:data.status,
        pix_status_details:data.status_detail,
        pix_qr_code: point_of_interaction.transaction_data
      });
    } else {
      paymentData = {
        transaction_amount: Number(body.transaction_amount),
        token: body.token,
        description: body.description,
        installments: Number(body.installments),
        payment_method_id: body.payment_method_id,
        issuer_id: body.issuerId,
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
      res.status(201).json({
        pay_status_detail: data.status_detail,
        pay_status: data.status,
        pay_id: data.id
      });
    }
    // console.log(paymentData)

    // teste
    // 4509 9535 6623 3704
    // APRO 
    // 11/25

  } catch (error) {
    console.log(error);
    const { errorMessage, errorStatus } = validator(error);
    res.status(errorStatus).json({ error_message: errorMessage });
  }
}

async function Webhook(req, res) {
  try {
    // Processar os dados recebidos do Mercado Pago
    const data = req.body;

    console.log('Dados do webhook:', data);

    if (data.action === 'payment.created') {
      const paymentId = data.data.id;
      const userId = data.user_id;

      console.log(`Payment ID ${paymentId} created for User ID ${userId}`);
    }
    
    if (notification.action === 'payment.update') {
      try {
          const paymentId = notification.data.id;
          const access_token = mercadopago.access_token;

          const response = await axios.get(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
              headers: {
                  Authorization: `Bearer ${access_token}`
              }
          });

          const paymentStatus = response.data.status;
          console.log(`Status do pagamento ${paymentId}: ${paymentStatus}`);

          res.status(200).send('Notificação recebida e processada com sucesso.');
      } catch (error) {
          console.error('Erro ao verificar pagamento:', error);
          res.status(500).send('Erro ao processar notificação de pagamento.');
      }
  }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}


// app.post('/webhook', (req, res) => {
//   // Processamento da notificação do Mercado Pago
//   const evento = req.body;

//   const resposta = { message: 'Pagamento processado com sucesso!' };

//   // Enviar a resposta para o servidor de front-end
//   fetch('http://localhost:3001/notification', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(resposta)
//   })
//   .then(() => {
//       res.status(200).send('Notificação recebida e resposta enviada ao front-end.');
//   })
//   .catch(error => {
//       console.error('Erro ao enviar resposta para o front-end:', error);
//       res.status(500).send('Erro ao processar notificação e enviar resposta.');
//   });
// });

module.exports = {
  bookTicket,
  Pay,
  Webhook
};