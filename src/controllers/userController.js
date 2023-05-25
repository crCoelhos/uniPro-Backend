const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const db = require('../models');
const Role = db.Role;
const User = db.User;
const UserRole = db.UserRole


exports.createUser = async (req, res) => {
    try {

        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const { user, role } = req.body;
        const hashedPassword = await bcrypt.hash(userUpdate.password, 10);
        userUpdate.password = hashedPassword;

        const userCreate = await User.create(user);
        await userCreate.setRole(role.id)
        console.log(role)
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getAllUserRole = async (req, res) => {
    try {
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const userRole = await UserRole.findAll();
        res.status(200).json(userRole);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const users = await User.findAll({
            include: [{
                model: Role,
                as: 'role',
            }],
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
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
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
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })
        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const userUpdate = await User.findByPk(id)
        if (userUpdate) {
            const { user, role } = req.body;
            const hashedPassword = await bcrypt.hash(userUpdate.password, 10);
            userUpdate.password = hashedPassword;

            const userUpdate = await User.create(user);
            await userUpdate.setRole(role.id)
            await user.setRole(role.id)
            return res.status(200).json(user);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findByPk(id)
        console.log(user)
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
    console.log(req)
    const id = req._id;
    if (!id) {
        res.json({ message: "Você não passou o id no paramentro" })
    }
    const userRole = await UserRole.findOne({
        where: { userId: id },
        attributes: ['roleId']
    })
        .then(({ roleId }) => Role.findOne({
            where: { id: roleId },
            attributes: ['name']
        }));
    return userRole;
}

exports.getUserRoleById = async (req, res) => {
    try{
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }

        const id = req.params.id;
        if(!id){
            res.json({message:'Você não passou nenhum id correto como parâmetro'})
        }
        const role = await UserRole.findOne({
            where:{id:id},
            attributes:['id', 'userId', 'roleId', 'createdAt', 'updatedAt'],
        })
        res.status(200).json(role)
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getUserRoleByUserId = async (req, res) => {
    try {
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })
    
        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const id = req.params.id;
        if(!id){
            res.json({message:'Você não passou nenhum id correto como parâmetro'})
        }
        const role = await UserRole.findAll({
            where:{userId:id}, 
            attributes:['id', 'userId', 'roleId', 'createdAt', 'updatedAt'],
            include:[{
                model: Role,
                as:'role'
            }]
        })
        res.status(200).json(role)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getUserRoleByRoleId = async (req, res) => {
    try {
        const _id = req.user.id;
        const roleUser = await this.getRole({ _id })
    
        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const id = req.params.id;
        if(!id){
            res.json({message:'Você não passou nenhum id correto como parâmetro'})
        }
        const role = await UserRole.findAll({
            where:{roleId:id}, 
            attributes:['id', 'userId', 'roleId', 'createdAt', 'updatedAt']
        })
        res.status(200).json(role)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}