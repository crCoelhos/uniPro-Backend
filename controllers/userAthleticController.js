const config = require(__dirname + '/../config/config.js')[env];
const { Op } = require('sequelize');
const db = require('../models');
const User_athletics = db.User_athletics;
const User = db.User;
const Athletic = db.Athletic;

async function createUserAthletic(req, res) {
    try {

        const user_athletic = req.body;
        const newUA = await User_athletics.create(user_athletic)

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
                attributes:['id', 'name']
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



module.exports = {
    createUserAthletic,
    updateUserAthletic,
    getAllUserAthletics
}