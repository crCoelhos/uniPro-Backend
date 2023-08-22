const db = require('../models');
const Modality = db.Modality

async function createModality(req, res) {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar modalidades.' });
        }
        console.log(req.body)
        const modality = req.body;
        const newModality = await Modality.create(modality)
        console.log(newModality)

        res.status(201).json(newModality)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function getAllModalities(req, res) {
    try {
        const modalities = await Modality.findAll()

        res.status(201).json(modalities)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


async function getModalityById(req, res) {
    try {

        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar modalidades.' });
        }

        const { id } = req.params;
        const modality = await Modality.findByPk(id)

        res.status(201).json(modality)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function updateModalityById(req, res) {
    try {
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'Você não tem permissão para criar modalidades.' });
        }

        const { id } = req.params;

        const modality = await Modality.findByPk(id)

        if (!modality) {
            return res.status(404).json({ error: 'Modalidade não encontrado' });
        }


        const modalityUpdate = req.body;
        await Modality.update(modalityUpdate,
            {
                where: { id: modality.id }
            }
        )
        
        res.json({message: "Modalidade atualizada com sucesso!"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

async function deleteModalityById(req, res) {
    try {
        const { id } = req.params;

        const modality = Modality.findByPk(id)

        if(!modality){
            return res.status(404).json({ error: 'Modalidade não encontrado' });
        }

        await modality.destroy()

        res.json({message: "Modalidade excluida com sucesso!"})
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}




module.exports = {
    createModality,
    getAllModalities,
    getModalityById,
    updateModalityById,
    deleteModalityById
}
