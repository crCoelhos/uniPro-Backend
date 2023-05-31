const db = require('../models');
const Event = db.Event;
const Batch = db.Batch;

async function createEvent(req, res) {
  try {


    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
    }

    const { name, state, date, location, description } = req.body;

    const newEvent = await Event.create({
      name,
      state,
      date,
      location,
      description,
    });

    res.status(201).json({ event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar o evento' });
  }
}


async function getEvent(req, res) {
  try {
    const eventId = req.params.id;

    const event = await Event.findOne({
      where:{
        id:eventId
      },
      include:[{
        model: Batch,
        as: 'batch'
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

    const events = await Event.findAll({include:[{
      model: Batch,
      as: 'batch'
    }]});

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
    
    // event.name = name;
    // event.state = state;
    // event.date = date;
    // event.location = location;
    // event.description = description;
    
    // await event.save();

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

    if (req.user.role.name !== 'ADMIN') {
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

module.exports = {
  createEvent,
  getEvent,
  getAllEvent,
  updateEvent,
  deleteEvent,
};
