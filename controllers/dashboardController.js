const db = require('../models');
const Event = db.Event;
const Ticket = db.Ticket;
const User_ticket = db.User_ticket;
const User = db.User;
const User_athletic = db.User_athletic;
const Athletic = db.Athletic;

async function getdatausersbyevent(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Você não tem permissão para criar Cupons.' });
      }

    const eventId = req.params.eventId;

    const event = await Event.findOne({ where: { id: eventId } });

    if (!event) {
      return res.status(404).json({ message: 'Evento não encontrado' });
    }

    const tickets = await Ticket.findAll({ where: { eventId } });

    const ticketDetails = [];

    for (const ticket of tickets) {
      const user_tickets = await User_ticket.findAll({ where: { ticketId: ticket.id } });

      const userDetails = [];

      for (const userTicket of user_tickets) {
        const user = await User.findOne({ where: { id: userTicket.userId } });
        const userAthletic = await User_athletic.findOne({
            where: { userId: user.id },
            include: [{ model: Athletic, as: 'athletic' }],
          });
      
        userDetails.push({
          userId: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          sex: user.sex,
          document: user.document,
          registration: user.registration,
          athleticId: userAthletic ? userAthletic.athletic.id : null,
          athleticName: userAthletic ? userAthletic.athletic.name : null,
        });
      }

      ticketDetails.push({
        ticketId: ticket.id,
        ticketName: ticket.name,
        users: userDetails,
      });
    }

    const eventData = {
      eventId: event.id,
      eventName: event.name,
      ticketDetails,
    };

    res.json(eventData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao requisitar' });
  }
}

module.exports = { getdatausersbyevent };
