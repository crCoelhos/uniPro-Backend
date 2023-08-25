const db = require('../models');
const Coupon = db.Coupon
const User = db.User;

async function createCoupon(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Você não tem permissão para criar Cupons.' });
    }

    const newCoupon = await Coupon.create(req.body);
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Ler um cupom
async function getCoupon(req, res) {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) {
      res.status(404).json({ message: 'Cupom não encontrado' });
      return;
    }
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// ler todos os cupons
async function getAllCoupon(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Você não tem permissão para pesquisa os cupons.' });
    }

    const coupons = await Coupon.findAll();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Atualizar o cupom
async function updateCoupon(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Você não tem permissão para editar um cupom.' });
    }

    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) {
      res.status(404).json({ message: 'Cupom não encontrado' });
      return;
    }
    await coupon.update(req.body);
    res.json(coupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Deleta um cupom
async function deleteCoupon(req, res) {
  try {

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Você não tem permissão para deletar um cupom.' });
    }

    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) {
      res.status(404).json({ message: 'Cupom não encontrado' });
      return;
    }
    await coupon.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// rotas consumo de cupom
async function consumeCoupon(req, res) {

    const { code } = req.params;
    const userId = await User.findByPk(req.user.token.id);
    if (!userId) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    try {
        const coupon = await Coupon.findOne({
          where: { code, isActive: true },
        });
    
        if (!coupon) {
          res.status(404).json({ message: 'Cupom não encontrado ou usado' });
          return;
        }

        const currentDate = new Date();
        if (coupon.expireDate && coupon.expireDate <= currentDate) {
        res.status(400).json({ message: 'Cupom já expirado' });
        return;
        }
    
        if (coupon.usageMax !== null && coupon.usageCount >= coupon.usageMax) {
          res.status(400).json({ message: 'Cupom já alcançou o maximo de usos' });
          return;
        }
    
        if (coupon.isUniqueUse) {
          const usedByUserId = coupon.usedByUserId;
          if (usedByUserId === userId) {
            res.status(400).json({ message: 'Esse cupom já foi utilizado' });
            return;
          }
        }
    
        await UsedCoupon.create({
          couponCode: coupon.code,
          userId: userId,
        });
    
        coupon.usageCount += 1;

        if (coupon.isUniqueUse) {
        coupon.isActive = false;
        }

        // Desativar o cupom se atingir o máximo de uso
        if (coupon.usageMax !== null && coupon.usageCount >= coupon.usageMax) {
        coupon.isActive = false;
        }

        await coupon.save();
    
        res.status(200).json({
            message: 'Cupom aplicado',
            couponType: coupon.type,
            couponAmount: coupon.amount,
          });
        } catch (error) {
        res.status(500).json({ message: error.message });   
    }
}

module.exports = {
  createCoupon,
  getCoupon,
  getAllCoupon,
  updateCoupon,
  deleteCoupon,
  consumeCoupon
};