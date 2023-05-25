const userController = require('../controllers/userController.js');
const db = require('../models');
const { Op } = require('sequelize');
const Role = db.Role;


// exports.createRole = async (req, res) => {
//     try {

//         const _id = req.user.id;
//         const roleUser = await this.getRole({_id})

//         if (roleUser.name !== 'ADMIN') {
//             return res.status(403).json({ message: 'Você não tem permissão para criar novos usuários.' });
//         }
//         const { name, description} = req.body;
        

//         // Verifica se existe o cargo

//         const roleExisting = await Role.findOne({
//             where: { name: roleName.name },
//         })
//         if (roleExisting){
//             return res.status(409).json({ message: 'Cargo já existe' });
//         }
//         const role = await Role.create({ name, description })
//         res.status(201).json(role);
//     } catch (err) {
//         res.status(500).json({ message: err.message }); 
//     } 
// }

exports.getAllRoles = async (req, res) => {

    try{
        const _id = req.user.id;
        const roleUser = await this.getRole({_id})

        if (roleUser.name !== 'ADMIN') {
            return res.status(403).json({message: 'Você não tem permissão para criar novos usuários.'});
        }
        const roles = await Role.findAll()
        res.status(200).json(roles)
    }
    catch (err) {
        res.status(500).json({message:err.message})
    }
} 

// exports.getRoleById = async (req, res) => {
//     try{
//         const _id = req.user.id;
//         const roleUser = await this.getRole({_id})

//         if (roleUser.name !== 'ADMIN') {
//             return res.status(403).json({message: 'Você não tem permissão para criar novos usuários.'});
//         }
//         const id = req.params.id
//         const role = await Role.findByPk(id);
//         return res.status(200).json(role)
//     }catch (err) {  
//         res.status(500).json({message:err.message})
//     }
// }

// exports.updateById = async (req, res) => {
//     try{
//         const _id = req.user.id;
//         const roleUser = await this.getRole({_id})

//         if (roleUser.name !== 'ADMIN') {
//             return res.status(403).json({message: 'Você não tem permissão para criar novos usuários.'});
//         }
//         const id = req.body.id
//         const updates = req.body
//         const role = await Role.update(
//             updates,
//             {where:{id:id}}
//         );
//         return res.status(200).json(role)
//     }catch (err) {  
//         res.status(500).json({message:err.message})
//     }
// }

// exports.deleteById = async (req, res) => {
//     try{
//         const _id = req.user.id;
//         const roleUser = await this.getRole({_id})

//         if (roleUser.name !== 'ADMIN') {
//             return res.status(403).json({message: 'Você não tem permissão para criar novos usuários.'});
//         }
//         const id = req.body.id
//         const user = await Role.findByPk(id);
//     if (user) {
//       await user.destroy();
//       res.status(204).json({ message: 'usuario excluído com sucesso' });
//     } else {
//       res.status(404).json({ message: 'usuario não encontrado' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// }