const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = require('../models');
const { Op } = require('sequelize');
const Category = db.Category;
const Event = db.Event;


exports.createCategory = async (req, res) => {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar categorys.' });
        }
        const category = req.body;
        let newCategory = await Category.create(category);

        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


exports.getAllCategorys = async (req, res) => {
    try {

        const categorys = await Category.findAll({
            include: [{
                model: Event,
                as: 'event',
            }],
            attributes: {
                exclude: [
                    'status',
                    'inProcessing'
                ],
            }
        });
        res.status(200).json(categorys);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}
exports.getCategoryById = async (req, res) => {
    try {

        const { id } = req.params;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const category = await Category.findOne({
            where: { id: id },
            include: [{
                model: Event,
                as: 'event',
                attributes: ['name']
            }],
            attributes: {
                exclude: ['eventId', 'status', 'inProcessing']
            }
        })

        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.updateCategoryById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão editar category.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }

        const categoryUpdate = await Category.findByPk(id)
        if (!categoryUpdate) {
            res.json({ message: 'Usuário não encontrado' })

        }
        const category = req.body;

        await Category.update(category, {
            where: { id: id }
        });
        return res.status(200).json({ message: "Usuário atualizado" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

exports.deleteCategoryById = async (req, res) => {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para deletar categorys.' });
        }

        const id = req.params.id;
        if (!id) {
            res.json({ message: "Você não passou o id no paramentro" })
        }
        const category = await Category.findByPk(id)
        if (category) {
            await category.destroy()
            res.status(204).json({ message: 'Category excluído com sucesso' });
        } else {
            res.status(404).json({ message: 'Category não encontrado' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

