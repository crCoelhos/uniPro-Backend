const Event = require("../models/Event.js");

exports.createEvent = async (req, res) => {
    try {
        // Verifica se o usuário logado possui a role "admin"
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
        }

        // Criptografa a senha
        const hashedPassword = await bcrypt.hash(password, 10);

        const event = await Event.create({  });
        res.status(201).json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};