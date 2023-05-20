const User = require("../models/User.js");

exports.createUser = async (req, res) => {
    try {
        // Verifica se o usuário logado possui a role "admin"
        if (!req.body.isAdmin) {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }
        const { name, CPF, email, contact, isAdmin, password } = req.body;
        console.log(req.body)

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
        
        const user = await User.find({})
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}