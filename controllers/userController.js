const bcrypt = require('bcrypt');
const db = require('../models');
const Role = db.Role;
const User = db.User;


exports.createUser = async (req, res) => {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
        }
    
        const { user } = req.body;
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;

        const newUser = new User({user});
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getAllUsers = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
        }
    
        const users = await User.findAll({
            include: [{
                model: Role,
                as: 'role',
                attributes:['name']
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
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
        }
    
        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findOne({
            where:{id:id},
            include:[{
                model: Role,
                as: 'role',
                attributes:['name']
            }],
            attributes: {
                exclude: ['roleId'],
            }
        })
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
        }
    
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const userUpdate = await User.findByPk(id)
        if (!userUpdate) {
            res.json({message:'Usuário não encontrado'})

        }
        const user  = req.body;
       
        await User.update(user,{
            where:{id:id}
        });
        return res.status(200).json({message:"Usuário atualizado"});
        
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar eventos.' });
        }
    
        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const user = await User.findByPk(id)
        console.log(user)
        if (user) {
            await user.destroy()
            res.status(204).json({ message: 'usuario excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'usuario não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

