const { QueryTypes } = require('sequelize');
const db = require('../models');
const Event = db.Event;
const Category = db.Category;
const Types_ticket = db.Types_ticket;

async function createEvent(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
    }

    const event = req.body;

    const newEvent = await Event.create(event);

    res.status(201).json({ event: newEvent });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar o evento' });
  }
}


async function getEventById(req, res) {
  try {
    const eventId = req.params.id;
  
    const event = await Event.findOne({
      where: {
        id: eventId
      },
      include: [{
        model: Category,
        as: 'category',
        include: [{
          model: Types_ticket,
          as: 'typeTicket',
          attributes: ['name', 'qt_modalities']
        }]
      }]
    });

    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    res.json({ event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter o evento' });
  }
}

async function getAllEvent(req, res) {
  try {

    const events = await Event.findAll();

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter os eventos' });
  }
}

async function updateEvent(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão editar evento.' });
    }

    const eventId = req.params.id;
    // const { name, state, date, location, description } = req.body;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }


    const eventUp = req.body;
    await Event.update(eventUp,
      {
        where: { id: eventId }
      }
    )


    const updated = await Event.findByPk(eventId);

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar o evento' });
  }
}

async function deleteEvent(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para deletar eventos.' });
    }

    const eventId = req.params.id;

    const event = await Event.findByPk(eventId);

    if (!event) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    event.state = 0;
    await event.save()
    res.json({ message: 'Evento excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir o evento' });
  }
}


async function getUserAthleticByEvent(req, res) {
  try {

    const dashboardEvent = await db.sequelize.query(
      `SELECT e.name as 'Evento', a.name as 'Atletica', u.name as 'Pessoas', u.email as 'Email', tt.name as 'Associacao',  t.price as 'Valor', t.id FROM uni_prod.users as u,  
       uni_prod.events as e,  uni_prod.athletics as a, uni_prod.user_tickets as ut, uni_prod.tickets as t, uni_prod.types_tickets as tt
       WHERE e.id = ut.eventId and u.id = ut.userId and u.id = ua.userId and a.id = ut.athleticId and t.id = ut.ticketId and t.typeTicketId = tt.id  
      `,
      {
        type: QueryTypes.SELECT
      }
    )


    res.json(dashboardEvent)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  createEvent,
  getEventById,
  getAllEvent,
  updateEvent,
  deleteEvent,
  getUserAthleticByEvent,
};
