const db = require('../models');
const User = db.User;
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

async function getAllAthletics(req, res) {
  try {
    const athletics = await Athletic.findAll({
      attributes: {
        exclude: ['direction']
      },
      include: [{
        model: User,
        as: 'user',        
        attributes:['name']
      }]
    });

    res.json({ athletics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter as Atletica`s' });
  }
}

async function getAthleticById(req, res) {
  try {
    const athleticId = req.params.id;
    const athletic = await Athletic.findOne({
      where: { id: athleticId },
      include: [{
        model: User,
        as: 'user',        
        attributes:['name']
      }]
    });

    if (!athletic) {
      return res.status(404).json({ message: 'Atletica não encontrada' });
    }

    res.json({ athletic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a Atletica' });
  }
}
// por nome ou id
async function getAthleticByName(req, res) {
  try {
    const athleticName = req.params.name;
    const athletic = await Athletic.findOne({
      where: { name: athleticName },
      attributes: {
        exclude: ['direction']
      }
    });

    if (!athletic) {
      return res.status(404).json({ message: 'Atletica não encontrada' });
    }

    res.json({ athletic });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao obter a Atletica' });
  }
}


async function updateAthleticById(req, res) {
  try {
      if (req.user.role !== 'MOD' || req.user.role !== 'ADMIN') {
          return res.status(403).json({ message: 'Você não tem permissão para editar atlética.' });
      }

      const id = req.params.id;
      if (!id) {
          res.json({ message: "Você não passou o id no paramentro" })
      }

      const athleticUpdate = await Athletic.findByPk(id)
      if (!athleticUpdate) {
          res.json({ message: 'Atlética não encontrada' })

      }
      const athletic = req.body;

      await athletic.update(athletic, {
          where: { id: id }
      });
      return res.status(200).json({ message: "Atlética atualizada" });

  } catch (err) {
      res.status(500).json({ message: err.message });
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

// Função para adicionar um usuário ao direction de uma Athletic
async function addUserToAthletic(req, res) {
  try {
    const athleticId = req.params.id;
    const userId = req.body.userId;

    // Verifica se a Athletic existe
    const athletic = await Athletic.findByPk(athleticId);
    if (!athletic) {
      return res.status(404).json({ message: 'Atletica não encontrada' });
    }

    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Obtém o objeto JSON da direção atual
    let direction = JSON.parse(athletic.direction || '{}');

    // Adiciona o novo usuário ao objeto direction
    direction[user.id] = user.name;

    // Atualiza o campo direction no modelo Athletic
    await Athletic.update({ direction: JSON.stringify(direction) }, { where: { id: athleticId } });

    res.json({ message: 'Usuário adicionado com sucesso à Atletica' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao adicionar o usuário à Atletica' });
  }
}



// Função para remover um usuário do direction de uma Athletic
async function removeUserFromAthletic(req, res) {
  try {
    const athleticId = req.params.id;
    const userId = req.body.userId;

    // Verifica se a Athletic existe
    const athletic = await Athletic.findByPk(athleticId);
    if (!athletic) {
      return res.status(404).json({ message: 'Atletica não encontrada' });
    }

    // Verifica se o usuário existe
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Remove o usuário do direction da Athletic
    await athletic.removeUser(user);

    res.json({ message: 'Usuário removido com sucesso da Atletica' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao remover o usuário da Atletica' });
  }
}


module.exports = {
  createAthletic,
  getAllAthletics,
  getAthleticById,
  getAthleticByName,
  updateAthleticById,
  deleteAthletic,
  addUserToAthletic,
  removeUserFromAthletic
};