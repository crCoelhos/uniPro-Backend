const mercadopago = require('mercadopago');
const process = require('process');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.js')[env];

class MercadopagoService {
  async execute({
    transaction_amount,
    token,
    description,
    installments,
    payment_method_id,
    email
  }) {
    mercadopago.configurations.setAccessToken(config.mercadopago.access_token);

    //console.log('Access Token:', config.mercadopago.access_token);

    return await mercadopago.payment
      .save({
        transaction_amount,
        token,
        description,
        installments,
        payment_method_id,
        payer: { email }
      })
      .then(async (data) => {
        const { status, response } = data;
        const { id, transaction_amount, date_approved, card } = response;
        const { first_six_digits, last_four_digits, cardholder } = card;

        return {
          status,
          id,
          transaction_amount,
          date_approved,
          first_six_digits,
          last_four_digits,
          display_name: cardholder.name
        };
      });
  }
}

module.exports = MercadopagoService;
