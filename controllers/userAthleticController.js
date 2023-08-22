const db = require('../models');
const User_athletic = db.User_athletic;
const User = db.User;
const Athletic = db.Athletic;

async function createUserAthletic(req, res) {
    try {

        const ids = req.body;
        const newUA = await User_athletic.create({userId:ids.userId, athleticId:ids.athleticId})

        res.status(201).json(newUA)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getAllUserAthletics(req, res) {
    try {

        const userAthletics = User_athletics.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes:['name']
            },
            {
                model: Athletic,
                as: 'athletic',
                attributes:['name']
            }]
        })

        res.status(200).json(userAthletics)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getUserAthleticById(req, res) {
    try {

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


async function getUserAthleticByEvent(req, res) {
    try {

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function updateUserAthletic(req, res) {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const userUpdate = await User_athletics.findByPk(id)
        if (!userUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const user = req.body;

        await User.update(user, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getUserAthleticByEventForMod(req, res) {
    try {
  
      const { id } = req.body.params
  
      const dashboardAthletic = await db.sequelize.query(
        `SELECT e.name as Evento, u.name as 'Pessoas', tt.name as 'Tipo', ua.id, ua.accepted as 'Aceito' FROM uni_prod.users as u, uni_prod.events as e, 
         uni_prod.athletics as a, uni_prod.user_tickets as ut, uni_prod.tickets as t, uni_prod.types_tickets as tt
         WHERE e.id = ut.eventId and u.id = ut.userId and u.id = ua.userId and a.id = ut.athleticId and t.id = ut.ticketId and t.typeTicketId = tt.id 
         and tt.name Like '%Atleta%' and a.id = ${id} 
        `,
        {
          type: QueryTypes.SELECT
        }
      )
  
  
      res.json(dashboardAthletic)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
  


module.exports = {
    createUserAthletic,
    updateUserAthletic,
    getAllUserAthletics,
    getUserAthleticByEventForMod
}