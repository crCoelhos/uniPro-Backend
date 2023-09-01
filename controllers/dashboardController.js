const db = require('../models');
const Event = db.Event;
const Ticket = db.Ticket;
const User_ticket = db.User_ticket;
const User = db.User;
const User_athletic = db.User_athletic;
const Athletic = db.Athletic;
const Type_ticket = db.Types_ticket;

async function getdatausersbyevent(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para visualizar os dados.' });
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

      let userDetails;

      for (const userTicket of user_tickets) {
        const user = await User.findOne({ where: { id: userTicket.userId } });
        const athletic = await Athletic.findOne({
          where: { id: userTicket.athleticId },
        });
        userDetails={
          userId: user.id,
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          sex: user.sex,
          document: user.document,
          registration: user.registration,
          athleticId: athletic ? athletic.id : null, 
          athleticName: athletic ? athletic.name : null,
        };
      }

      const typeTicket = await Type_ticket.findOne({ where: { id: ticket.typeTicketId } });


      ticketDetails.push({
        ticketId: ticket.id,
        ticketName: ticket.name,
        status: user_tickets.map(userTicket => userTicket.status),
        typeTicket: typeTicket ? typeTicket.name : null,
        userId: userDetails.userId,
        name: userDetails.name,
        email: userDetails.email,
        cpf: userDetails.cpf,
        sex: userDetails.sex,
        document: userDetails.document,
        registration: userDetails.registration,
        athleticId: userDetails.athleticId,
        athleticName: userDetails.athleticName
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
