const db = require('../models');
const Athletic = db.Athletic;

// Necessario modificar a req.body para enviar a foto da atletica
async function createAthletic(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
    }

    const { name, college_course, direction, img_url } = req.body;

    const newAthletic = await Athletic.create({
      name,
      college_course,
      direction,
      img_url
    });

    res.status(201).json({ athletic: newAthletic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar a Atletica' });
  }
}

// esconde os id usuarios da diretoria - pedente
async function getAllAthletics(req, res) {
  try {

    const athletics = await Athletic.findAll();

    res.json({ athletics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as Atletica`s' });
  }
}

// esconde os id usuarios da diretoria - pedente
async function getAthleticByName(req, res) {
  try {
    const athleticName = req.params.name;
    const athletic = await Athletic.findOne({ where: { name: athleticName } });

    if (!athletic) {
      return res.status(404).json({ message: 'Atletica não encontrada' });
    }

    res.json({ athletic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a Atletica' });
  }
}


async function deleteAthletic(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
    }

    const athleticId = req.params.id;
    const deletedAthletic = await Athletic.destroy({ where: { id: athleticId } });

    if (deletedAthletic === 0) {
      return res.status(404).json({ message: 'Atletica não encontrada' });
    }

    res.json({ message: 'Atletica excluído com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao excluir a atletica' });
  }
}

module.exports = {
  createAthletic,
  getAllAthletics,
  getAthleticByName,
  deleteAthletic
};