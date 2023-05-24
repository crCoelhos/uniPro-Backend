const bcrypt = require('bcrypt');
const db = require('../models');
const { Op } = require('sequelize');
const User = db.User;
const Role = db.Role;
const UserRole = db.UserRole


exports.createUser = async (req, res) => {
    try {

        const id = req.user.id;
        const roleUser = await this.getRole({ id })

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const { name, cpf, email, contact, password, birthdate } = req.body[0];
        const roleName  = req.body[1];

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, cpf, email, contact, password: hashedPassword, birthdate });
        const role = await Role.findOne({
            where: { name: roleName.name },
        })
        console.log("2222222222")
        const userRole = await UserRole.create({ userId: user.id, roleId: role.id })
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message }); 
    } 
}

exports.getAllUserRole = async (req, res) => {
    try {
        const userRole = await UserRole.findAll();
        const users = await User.findAll();
        res.status(200).json(userRole);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const userRole = await UserRole.findAll();
        const users = await User.findAll({
            attributes: {
                exclude: ['password'],
            }
        });
        res.status(200).json(users);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findByPk(id) 
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findByPk(id)
        if (user) {
            const updates = req.body;
            const hashedPassword = await bcrypt.hash(updates.password, 10);
            updates.password = hashedPassword;
            await user.update(updates);
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findByPk(id)
        if (user) {
            await user.destroy(user)
            res.status(204).json({ message: 'usuario excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'usuario não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getRole = async (req, res) => {

    const id = req.id;
    if (!id) {
        res.json({ message: "Você não passou o id no paramentro" })
    }
    const userRole = await UserRole.findOne({
        where: {userId: id},
        attributes: ['roleId']
    })
    .then(({ roleId }) => Role.findOne({
        where: { id: roleId },
        attributes: ['name']
    }));
    return userRole;
}



exports.updateUserRole = (req, res) =>{
    
}
// this.getAllUserRoles();