const bcrypt = require('bcrypt');
const User = require('../models/user')


exports.createUser = async (req, res) => {
    try {
        // Verifica se o usuário logado possui a role "admin"
        if (!req.body.isAdmin) {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const { name, CPF, email, contact, isAdmin, password } = req.body;

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, CPF, email, contact, isAdmin, password: hashedPassword });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
 
exports.getAllUsers = async (req, res) => {
    try {
        
        const users = await User.findAll()
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if(!id){
            res.json({message: "Você não passou o id no paramentro"})
        }
        const user = await User.findByPk(id)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateUserById = async (req, res) => {
    try {
        const id  = req.params.id;
        if(!id){
            res.json({message: "Você não passou o id no paramentro"})
        }
        const user = await User.findByPk(id)
        if (user) {
            const updates= req.body;
            const hashedPassword = await bcrypt.hash(updates.password, 10);
            updates.password = hashedPassword;
            await user.update(updates);
        }
        console.log(updates)
        console.log(user)
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        if(!id){
            res.json({message: "Você não passou o id no paramentro"})
        }
        const user = await User.findByPk(id)
        if(user){
            await user.destroy(user)
            res.status(204).json({ message: 'usuario excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'usuario não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}