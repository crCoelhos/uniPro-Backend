const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = require('../models');
const { Op } = require('sequelize');
const Types_ticket = db.Types_ticket;
const Category = db.Category;
const Event = db.Event;


async function createCategory(req, res) {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar categories.' });
        }
        const category = req.body;
        const newCategory = await Category.create(category);

        res.status(201).json(newCategory);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}


async function getAllCategories(req, res) {
    try {

        const categories = await Category.findAll({
            include: [{
                model: Event,
                as: 'event',
            },
            {
                model: Types_ticket,
                as: 'typeTicket',
                attributes: ['name']
            }],
            attributes: {
                exclude: [
                    'status',
                    'inProcessing'
                ],
            }
        });
        res.status(200).json(categories);
    } catch (err) {

        res.status(500).json({ message: err.message });
    }
}
async function getCategoryById(req, res) {
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
            },
            {
                model: Types_ticket,
                as: 'typeTicket',
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

async function updateCategoryById(req, res) {
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

async function deleteCategoryById(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para deletar categories.' });
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

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}