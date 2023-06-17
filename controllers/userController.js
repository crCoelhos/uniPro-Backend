const bcrypt = require('bcrypt');
const db = require('../models');
const Role = db.Role;
const Athletic = db.Athletic;
const User = db.User;
const Ticket = db.Ticket;

async function createUser(req, res) {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar usuários.' });
        }

        const { user } = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const newUser = new User({ user });
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getAllUsers(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão de busca de usuários.' });
        }
        console.log("AQUIIIIIIIIIIIIIIII")

        const users = await User.findAll({
            include: [{
                model: Role,
                as: 'role',
                attributes: ['name']
            },
            {
                model: Athletic,
                as: 'athleticByUser',
                attributes: ['name']
            },
            {
                model: Ticket,
                as: 'ticket',
                attributes: ['name'],
            }
            ],
            attributes: {
                exclude: ['password'],
            }
        });
        console.log("usuariooooooooooooooooooooooooooooooooooooooooooooooos",users)
        res.status(200).json(users);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}
async function getUserById(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão de busca de usuário.' });
        }

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findOne({
            where: { id: id },
            include: [{
                model: Role,
                as: 'role',
                attributes: ['name']
            },
            {
                model: Ticket,
                as: 'ticket',
                attributes: ['name'],
            },
            {
                model: Athletic,
                as: 'athleticByUser',
                attributes: ['name'],
            }],
            attributes: {
                exclude: ['roleId', 'password'],
            }
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

async function getUserByEmail(req, res) {
    try {

        const { email } = req.body;
        if (!email) {
            res.json({ message: "Você não passou o email no paramentro" })
        }
        const user = await User.findOne({
            where: { email: email },
            include: [{
                model: Role,
                as: 'role',
                attributes: ['name']
            },
            {
                model: Ticket,
                as: 'ticket',
                attributes: ['name'],
            },
            {
                model: Athletic,
                as: 'athleticByUser',
                attributes: ['name'],
            }],
            attributes: {
                exclude: ['roleId', 'password'],
            }
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



async function updateUserById(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para editar usuário.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const userUpdate = await User.findByPk(id)
        if (!userUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const user = req.body;

        await User.update(user, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function deleteUserById(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para deletar usuário.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findByPk(id)
        if (user) {
            await user.destroy()
            res.status(204).json({ message: 'Usuário excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUserById,
    deleteUserById,
}
